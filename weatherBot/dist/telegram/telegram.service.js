"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const admin_service_1 = require("../admin/admin.service");
const axios_1 = require("axios");
const cron_1 = require("cron");
const telegraf_1 = require("telegraf");
let TelegramService = class TelegramService {
    constructor(usersService, adminService) {
        this.usersService = usersService;
        this.adminService = adminService;
        this.sendWeatherUpdate = async (userId, cityName) => {
            const OPEN_WEATHER_API_KEY = '40453d9f6f8fb3bbdaf2a2ebc3fb796f';
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OPEN_WEATHER_API_KEY}`;
            try {
                const response = await axios_1.default.get(url);
                const weather = response.data.weather[0].description;
                const temperature = response.data.main.temp - 273.15;
                const humidity = response.data.main.humidity;
                this.bot.telegram.sendMessage(userId, `Weather update for ${cityName}: ${weather}. Temperature: ${temperature.toFixed(2)}°C. Humidity: ${humidity}%.`);
            }
            catch (error) {
                console.error(error);
            }
        };
        this.sendMessageToUser = (userId, message) => {
            this.bot.telegram.sendMessage(userId, message);
        };
        this.usersService = usersService;
        this.adminService = adminService;
        const TELEGRAM_TOKEN = this.adminService.getApiKey();
        this.bot = new telegraf_1.Telegraf(TELEGRAM_TOKEN);
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
        this.bot.telegram.setWebhook('https://weatherbot-r5f9.onrender.com/path-to-webhook');
        new cron_1.CronJob('0 9 * * *', async () => {
            const users = await this.usersService.getAllSubscribedUsers();
            for (const user of users) {
                this.sendWeatherUpdate(user.userId, user.location);
            }
        }, null, true, 'Asia/Kolkata');
    }
    async handleUpdate(update) {
        await this.bot.handleUpdate(update);
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, admin_service_1.AdminService])
], TelegramService);
//# sourceMappingURL=telegram.service.js.map