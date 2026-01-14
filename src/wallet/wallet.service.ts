import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class WalletService {
  constructor(private usersService: UsersService) {}

  async fund(userId: string, amount: number) {
    if (amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero');
    }

    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.walletBalance += amount;
    await this.usersService.save(user);

    return {
      success: true,
      reference: `OP_${Date.now()}`,
    };
  }

  async debit(userId: string, amount: number) {
    if (amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero');
    }

    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.walletBalance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    user.walletBalance -= amount;
    await this.usersService.save(user);
  }

  async getBalance(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      balance: user.walletBalance,
    };
  }
}
