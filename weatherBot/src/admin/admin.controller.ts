import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
 
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('api-key')
  getApiKey() {
    return this.adminService.getApiKey();
  }

  @Post('api-key/:apiKey')
  async setApiKey(@Param('apiKey') apiKey ){
    return await this.adminService.setApi(apiKey);
  }
}