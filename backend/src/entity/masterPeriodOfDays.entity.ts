import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('master_periods_of_day')
export class MasterPeriodOfDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar' })
  time: string;
}
