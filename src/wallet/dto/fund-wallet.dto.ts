import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class FundWalletDto {
  @ApiProperty({ example: 5000 })
  @IsNumber()
  @Min(1)
  amount: number;
}


export class FundWalletResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'OP_1673784823' })
  reference: string;
}

export class WalletBalanceDto {
  @ApiProperty({ example: 12000 })
  balance: number;
}
