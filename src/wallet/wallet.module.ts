import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { UsersModule } from '../users/users.module';
import { WalletTransaction } from './wallet-transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([WalletTransaction])],
  exports: [WalletService],
  providers: [WalletService],
  controllers: [WalletController],
})
export class WalletModule {}
