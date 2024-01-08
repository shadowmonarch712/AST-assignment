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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
let UsersService = class UsersService {
    constructor() {
        this.uri = "mongodb+srv://shadowmonarch:testuser@cluster0.6rftf0c.mongodb.net/";
        this.client = new mongodb_1.MongoClient(this.uri, { monitorCommands: true });
    }
    async create(userId) {
        try {
            await this.client.connect();
            const collection = this.client.db("test").collection("user_ids");
            await collection.insertOne({ userId: userId });
            console.log(typeof (userId));
            console.log('Successfully wrote user ID to MongoDB');
        }
        catch (err) {
            console.error('Error writing to MongoDB:', err);
        }
        finally {
            await this.client.close();
        }
    }
    async delete(userId) {
        try {
            await this.client.connect();
            const collection = this.client.db("test").collection("location");
            const result = await collection.deleteMany({ userId: userId });
            console.log(`Successfully deleted ${result.deletedCount} document(s)`);
        }
        catch (err) {
            console.error('Error deleting from MongoDB:', err);
        }
        finally {
            await this.client.close();
        }
    }
    async unblock(userId) {
        try {
            await this.client.connect();
            const collection = this.client.db("test").collection("blocked_user_ids");
            const result = await collection.deleteMany({ userId: userId });
            console.log(`Successfully deleted ${result.deletedCount} document(s)`);
        }
        catch (err) {
            console.error('Error deleting from MongoDB:', err);
        }
        finally {
            await this.client.close();
        }
    }
    async block(userId) {
        try {
            await this.client.connect();
            const collection = this.client.db("test").collection("blocked_user_ids");
            await collection.insertOne({ userId: userId });
            console.log('Successfully wrote user ID to MongoDB');
        }
        catch (err) {
            console.error('Error writing to MongoDB:', err);
        }
        finally {
            await this.client.close();
        }
    }
    async isBlocked(userId) {
        try {
            await this.client.connect();
            const collection = this.client.db("test").collection("blocked_user_ids");
            const user = await collection.findOne({ userId: userId });
            return user != null;
        }
        catch (err) {
            console.error('Error reading from MongoDB:', err);
            return false;
        }
        finally {
            await this.client.close();
        }
    }
    async saveLocation(userId, location) {
        try {
            await this.client.connect();
            const collection = this.client.db("test").collection("location");
            await collection.insertOne({ userId: userId, location: location });
            console.log('Successfully wrote user ID and location to MongoDB');
        }
        catch (err) {
            console.error('Error writing to MongoDB:', err);
        }
        finally {
            await this.client.close();
        }
    }
    async getAllSubscribedUsers() {
        try {
            await this.client.connect();
            const collection = this.client.db("test").collection("location");
            return await collection.find({}).toArray();
        }
        catch (err) {
            console.error('Error reading from MongoDB:', err);
            return [];
        }
        finally {
            await this.client.close();
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UsersService);
//# sourceMappingURL=users.service.js.map