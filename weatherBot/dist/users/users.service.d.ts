export declare class UsersService {
    private client;
    private uri;
    constructor();
    create(userId: string): Promise<void>;
    delete(userId: string): Promise<void>;
    unblock(userId: string): Promise<void>;
    block(userId: string): Promise<void>;
    isBlocked(userId: string): Promise<boolean>;
    saveLocation(userId: string, location: string): Promise<void>;
    getAllSubscribedUsers(): Promise<import("mongodb").WithId<import("bson").Document>[]>;
}
