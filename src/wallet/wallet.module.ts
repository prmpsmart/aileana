import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  exports: [WalletService],
  providers: [WalletService],
  controllers: [WalletController],
})
export class WalletModule {}
