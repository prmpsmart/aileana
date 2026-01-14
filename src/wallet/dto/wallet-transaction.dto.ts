import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../transaction-type';

export class WalletTransactionDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: TransactionType })
  type: TransactionType;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  reference: string;

  @ApiProperty()
  createdAt: Date;
}
