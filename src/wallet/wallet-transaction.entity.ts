import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { TransactionType } from './transaction-type';
import { TransactionStatus } from './transaction-status';

@Entity()
export class WalletTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  amount: number;

  @Column({ type: 'text' })
  type: TransactionType;

  @Column({ type: 'text' })
  status: TransactionStatus;

  @Column()
  reference: string;

  @CreateDateColumn()
  createdAt: Date;
}
