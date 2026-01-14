import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CallStatus } from './call-status.enum';

@Entity()
export class CallSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  callerId: string;

  @Column()
  calleeId: string;

  @Column({ type: 'text', default: CallStatus.INITIATED })
  status: CallStatus;

  @Column({ nullable: true })
  startTime?: Date;

  @Column({ nullable: true })
  endTime?: Date;

  @Column()
  ratePerMinute: number;
}
