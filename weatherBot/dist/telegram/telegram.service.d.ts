import { UsersService } from 'src/users/users.service';
import { AdminService } from 'src/admin/admin.service';
export declare class TelegramService {
    private usersService;
    private adminService;
    private readonly bot;
    constructor(usersService: UsersService, adminService: AdminService);
    handleUpdate(update: any): Promise<void>;
    sendWeatherUpdate: (userId: string, cityName: string) => Promise<void>;
    sendMessageToUser: (userId: number, message: string) => void;
}
