import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { UsersService } from '../users/users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('WalletService', () => {
  let walletService: WalletService;
  let usersService: Partial<UsersService>;

  beforeEach(async () => {
    usersService = {
      findById: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        { provide: UsersService, useValue: usersService },
      ],
    }).compile();

    walletService = module.get<WalletService>(WalletService);
  });

  it('should fund a user', async () => {
    const user = { walletBalance: 100 };
    (usersService.findById as jest.Mock).mockResolvedValue(user);
    (usersService.save as jest.Mock).mockResolvedValue(null);

    const result = await walletService.fund('user1', 50);
    expect(user.walletBalance).toBe(150);
    expect(result).toHaveProperty('reference');
  });

  it('should throw NotFoundException if user not found', async () => {
    (usersService.findById as jest.Mock).mockResolvedValue(null);
    await expect(walletService.fund('user1', 50)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw BadRequestException on negative amount', async () => {
    await expect(walletService.fund('user1', -10)).rejects.toThrow(
      BadRequestException,
    );
  });
});
