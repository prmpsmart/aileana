import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallSession } from './call.entity';
import { WalletService } from '../wallet/wallet.service';
import { CallStatus } from './call-status.enum';

@Injectable()
export class CallsService {
  constructor(
    @InjectRepository(CallSession)
    private readonly repo: Repository<CallSession>,
    private readonly walletService: WalletService,
  ) {}

  async initiate(callerId: string, calleeId: string, rate: number) {
    if (rate <= 0) {
      throw new BadRequestException('Rate must be greater than zero');
    }

    return this.repo.save({
      callerId,
      calleeId,
      ratePerMinute: rate,
      status: CallStatus.INITIATED,
    });
  }

  async start(id: string) {
    const call = await this.repo.findOne({ where: { id } });

    if (!call) {
      throw new NotFoundException('Call not found');
    }

    if (call.status !== CallStatus.INITIATED) {
      throw new BadRequestException(
        `Cannot start call in status ${call.status}`,
      );
    }

    call.status = CallStatus.ONGOING;
    call.startTime = new Date();

    return this.repo.save(call);
  }

  async end(id: string) {
    const call = await this.repo.findOne({ where: { id } });

    if (!call) {
      throw new NotFoundException('Call not found');
    }

    if (call.status !== CallStatus.ONGOING) {
      throw new BadRequestException(`Cannot end call in status ${call.status}`);
    }

    call.endTime = new Date();
    call.status = CallStatus.ENDED;

    const minutes = Math.max(
      1,
      Math.ceil((call.endTime.getTime() - call.startTime!.getTime()) / 60000),
    );

    await this.walletService.debit(call.callerId, minutes * call.ratePerMinute);

    return this.repo.save(call);
  }
}
