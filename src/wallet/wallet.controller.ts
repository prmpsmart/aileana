import { Controller, Get, Req, Post, Body, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import {
  FundWalletDto,
  FundWalletResponseDto,
  WalletBalanceDto,
} from './dto/fund-wallet.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { WalletTransactionDto } from './dto/wallet-transaction.dto';

@ApiTags('Wallet')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @ApiOkResponse({ type: FundWalletResponseDto })
  @Post('fund')
  fund(@Req() req, @Body() dto: FundWalletDto) {
    return this.walletService.fund(req.user.userId, dto.amount);
  }

  @ApiOkResponse({ type: WalletBalanceDto })
  @Get('balance')
  balance(@Req() req) {
    return this.walletService.getBalance(req.user.userId);
  }

  @ApiOkResponse({ type: [WalletTransactionDto] })
  @Get('transactions')
  transactions(@Req() req) {
    return this.walletService.getTransactions(req.user.userId);
  }
}
