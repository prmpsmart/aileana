import { Test, TestingModule } from '@nestjs/testing';
import { CallsService } from './calls.service';
import { WalletService } from '../wallet/wallet.service';
import { Repository } from 'typeorm';
import { CallSession } from './call.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('CallsService', () => {
  let callsService: CallsService;
  let repo: Partial<Repository<CallSession>>;
  let walletService: Partial<WalletService>;

  beforeEach(async () => {
    repo = {
      save: jest.fn(),
      findOne: jest.fn(),
    };
    walletService = { debit: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CallsService,
        { provide: getRepositoryToken(CallSession), useValue: repo },
        { provide: WalletService, useValue: walletService },
      ],
    }).compile();

    callsService = module.get<CallsService>(CallsService);
  });

  it('should initiate a call', async () => {
    const mockCall = {};
    (repo.save as jest.Mock).mockResolvedValue(mockCall);

    const result = await callsService.initiate('caller', 'callee', 50);
    expect(repo.save).toHaveBeenCalledWith({
      callerId: 'caller',
      calleeId: 'callee',
      ratePerMinute: 50,
      status: 'INITIATED',
    });
    expect(result).toBe(mockCall);
  });

  it('should throw NotFoundException if starting non-existent call', async () => {
    (repo.findOne as jest.Mock).mockResolvedValue(null);
    await expect(callsService.start('id')).rejects.toThrow(NotFoundException);
  });
});
