import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AdminService } from 'src/admin/admin.service';
import axios from "axios";
import { CronJob } from 'cron';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
    private readonly bot: any;

    constructor(private usersService : UsersService , private adminService : AdminService){
        this.usersService = usersService;
        this.adminService = adminService;
        const TELEGRAM_TOKEN = this.adminService.getApiKey(); 
        this.bot = new Telegraf(TELEGRAM_TOKEN);
        this.bot.start((ctx) => ctx.reply('Welcome to your daily weather reporter! we will give you daily updates about your weather location, do you wish to subscribe?'));
        this.bot.help((ctx) => ctx.reply('All the commands are given below'));
        this.bot.command('subscribe', async (ctx) => {
            await this.usersService.create(ctx.from.id.toString());
            ctx.reply('You have successfully subscribed to daily weather Reporter, Please type /location to put another step towards getting your daily weather updates');
        });
        this.bot.command('stop', async (ctx) => {
            await this.usersService.delete(ctx.from.id.toString());
            ctx.reply('You have successfully unsubscribed from daily weather updates. We look forward to see you again. REMEMBER we are just a few commands away');
        });
        this.bot.command('location', async (ctx) => {
            const cityName = ctx.message.text.split(' ').slice(1).join(' ');
            await this.usersService.saveLocation(ctx.from.id.toString(), cityName);
            ctx.reply(`Your location has been set to ${cityName}. You will start receiving daily weather updates.`);
        });
        this.bot.launch();

        new CronJob('0 9 * * *', async () => {
            const users = await this.usersService.getAllSubscribedUsers();
            for (const user of users) {
                this.sendWeatherUpdate(user.userId, user.location);
            }
        }, null, true, 'Asia/Kolkata');
    }

    sendWeatherUpdate = async (userId: string, cityName: string) => {
        const OPEN_WEATHER_API_KEY = '40453d9f6f8fb3bbdaf2a2ebc3fb796f';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OPEN_WEATHER_API_KEY}`;
    
        try {
            const response = await axios.get(url);
            console.log(response.data)
            const weather = response.data.weather[0].description;
            const temperature = response.data.main.temp - 273.15;
            const humidity = response.data.main.humidity;
            this.bot.telegram.sendMessage(userId, `Weather update for ${cityName}: ${weather}. Temperature: ${temperature.toFixed(2)}°C. Humidity: ${humidity}%.`);
        } catch (error) {
            console.error(error);
        }
    }
    sendMessageToUser = (userId: number, message: string) => {
        this.bot.telegram.sendMessage(userId, message);
    }
}