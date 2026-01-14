import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletTransaction } from './wallet-transaction.entity';
import { TransactionType } from './transaction-type';
import { TransactionStatus } from './transaction-status';

@Injectable()
export class WalletService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(WalletTransaction)
    private transactionRepo: Repository<WalletTransaction>,
  ) {}

  async fund(userId: string, amount: number) {
    if (amount <= 0)
      throw new BadRequestException('Amount must be greater than zero');

    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    user.walletBalance += amount;
    await this.usersService.save(user);

    const reference = `OP_${Date.now()}`;
    await this.transactionRepo.save({
      userId,
      type: TransactionType.CREDIT,
      status: TransactionStatus.SUCCESS,
      amount,
      reference,
    });

    return { success: true, reference };
  }

  async debit(userId: string, amount: number) {
    if (amount <= 0)
      throw new BadRequestException('Amount must be greater than zero');

    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    if (user.walletBalance < amount)
      throw new BadRequestException('Insufficient balance');

    user.walletBalance -= amount;
    await this.usersService.save(user);

    const reference = `OP_${Date.now()}`;
    await this.transactionRepo.save({
      userId,
      type: TransactionType.DEBIT,
      amount,
      reference,
    });

    return { success: true, reference };
  }

  async getBalance(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    return { balance: user.walletBalance };
  }

  // New: Get transaction history
  async getTransactions(userId: string) {
    return this.transactionRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
}
