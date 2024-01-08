// src/contacts/contacts.service.ts
import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class UsersService {
  private client: MongoClient;
  private uri = "mongodb+srv://shadowmonarch:testuser@cluster0.6rftf0c.mongodb.net/";

  constructor() {
    this.client = new MongoClient(this.uri, {monitorCommands: true});
  }

  async create(userId: string) {
    try {
      await this.client.connect();
      const collection = this.client.db("test").collection("user_ids");
      await collection.insertOne({userId: userId});
      console.log(typeof(userId))
      console.log('Successfully wrote user ID to MongoDB');
    } catch (err) {
      console.error('Error writing to MongoDB:', err);
    } finally {
      await this.client.close();
    }
  }
  async delete(userId: string) {
    try {
      await this.client.connect();
      const collection = this.client.db("test").collection("location");
      const result = await collection.deleteMany({userId: userId});
      console.log(`Successfully deleted ${result.deletedCount} document(s)`);
    } catch (err) {
      console.error('Error deleting from MongoDB:', err);
    } finally {
      await this.client.close();
    }
  }
  async unblock(userId: string) {
    try {
      await this.client.connect();
      const collection = this.client.db("test").collection("blocked_user_ids");
      const result = await collection.deleteMany({userId: userId});
      console.log(`Successfully deleted ${result.deletedCount} document(s)`);
    } catch (err) {
      console.error('Error deleting from MongoDB:', err);
    } finally {
      await this.client.close();
    }
  }

  async block(userId: string) {
    try {
      await this.client.connect();
      const collection = this.client.db("test").collection("blocked_user_ids");
      await collection.insertOne({userId: userId});
      console.log('Successfully wrote user ID to MongoDB');
    } catch (err) {
      console.error('Error writing to MongoDB:', err);
    } finally {
      await this.client.close();
    }
  } 
  async isBlocked(userId: string) {
    try {
      await this.client.connect();
      const collection = this.client.db("test").collection("blocked_user_ids");
      const user = await collection.findOne({userId: userId});
      return user != null;
    } catch (err) {
      console.error('Error reading from MongoDB:', err);
      return false;
    } finally {
      await this.client.close();
    }
  }

  async saveLocation(userId: string, location:string) {
    try {
      await this.client.connect();
      const collection = this.client.db("test").collection("location");
      await collection.insertOne({userId: userId, location: location});
      console.log('Successfully wrote user ID and location to MongoDB');
    } catch (err) {
      console.error('Error writing to MongoDB:', err);
    } finally {
      await this.client.close();
    }
}
  async getAllSubscribedUsers() {
    try {
      await this.client.connect();
      const collection = this.client.db("test").collection("location");
      return await collection.find({}).toArray();
    } catch (err) {
      console.error('Error reading from MongoDB:', err);
      return [];
    } finally {
      await this.client.close();
    }
  }


}
