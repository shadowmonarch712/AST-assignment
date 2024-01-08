import { Controller, Post, Body, Delete, Query, Param, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get('getusers')
  async getUser() {
    return await this.usersService.getAllSubscribedUsers();
  }
  @Get('isBlocked/:userID')
  async isBlocked(@Param('userID') userID) {
    return await this.usersService.isBlocked(userID);
  }
  @Post('users/:userID')
  async createUser(@Param('userID') userID) {
    return await this.usersService.create(userID);
  }
  @Post('block/:userID')
  async blockUser(@Param('userID') userID) {
    return await this.usersService.block(userID);
  }
  @Delete('delete/:userID')
  async deleteUser(@Param('userID') userID){
    return await this.usersService.delete(userID);
  }
  @Delete('unblock/:userID')
  async unblockUser(@Param('userID') userID){
    return await this.usersService.unblock(userID);
  }
  
  
}
