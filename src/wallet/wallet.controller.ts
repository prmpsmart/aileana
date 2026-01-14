import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { FundWalletDto } from './dto/fund-wallet.dto';

@ApiTags('Wallet')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post('fund')
  fund(@Req() req, @Body() dto: FundWalletDto) {
    return this.walletService.fund(req.user.userId, dto.amount);
  }

  @Get('balance')
  balance(@Req() req) {
    return this.walletService.getBalance(req.user.userId);
  }
}
