import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cohort } from './cohorts.entity';

@Entity('master_periods_of_day')
export class MasterPeriodOfDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar' })
  time: string;

  @OneToMany(() => Cohort, (cohort) => cohort.periodOfDay)
  cohorts: Cohort[];
}
