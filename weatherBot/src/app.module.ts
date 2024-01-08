import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TelegramModule } from './telegram/telegram.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [UsersModule, TelegramModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
