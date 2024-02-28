import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('master_periods_of_day')
export class MasterPeriodOfDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['Morning', 'Afternoon', 'Evening'] })
  name: string;

  @Column({ type: 'varchar' })
  time: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
