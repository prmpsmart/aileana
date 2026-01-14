import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallSession } from './call.entity';
import { CallsService } from './calls.service';
import { CallsController } from './calls.controller';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [TypeOrmModule.forFeature([CallSession]), WalletModule],
  providers: [CallsService],
  controllers: [CallsController],
})
export class CallsModule {}
