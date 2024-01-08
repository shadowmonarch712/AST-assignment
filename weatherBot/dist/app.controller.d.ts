import { AppService } from './app.service';
import { TelegramService } from './telegram/telegram.service';
export declare class AppController {
    private readonly appService;
    private readonly telegramService;
    constructor(appService: AppService, telegramService: TelegramService);
    getHello(): string;
    receiveUpdate(request: any, response: any): Promise<void>;
}
