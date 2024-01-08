import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUser(): Promise<import("mongodb").WithId<import("bson").Document>[]>;
    isBlocked(userID: any): Promise<boolean>;
    createUser(userID: any): Promise<void>;
    blockUser(userID: any): Promise<void>;
    deleteUser(userID: any): Promise<void>;
    unblockUser(userID: any): Promise<void>;
}
