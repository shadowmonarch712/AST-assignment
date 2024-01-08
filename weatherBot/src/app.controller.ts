import { Controller, Get, Post, Param, Delete, Req, Res, HttpStatus} from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { TelegramService } from './telegram/telegram.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly telegramService : TelegramService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('path-to-webhook')
  async receiveUpdate(@Req() request, @Res() response) {
    const update = request.body;
    await this.telegramService.handleUpdate(update);
    response.status(HttpStatus.OK).send();
  }
}
