import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class WalletTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  amount: number;

  @Column()
  type: 'CREDIT' | 'DEBIT';

  @Column()
  status: 'SUCCESS' | 'FAILED';

  @Column()
  reference: string;
}
