import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('master_period_of_days')
export class MasterPeriodOfDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar' })
  time: string;
}
