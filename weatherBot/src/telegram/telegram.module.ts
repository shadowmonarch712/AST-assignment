import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import {UsersModule} from '../users/users.module'
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [UsersModule, AdminModule],
  providers: [TelegramService],
  exports: [TelegramService]
})
export class TelegramModule {}
