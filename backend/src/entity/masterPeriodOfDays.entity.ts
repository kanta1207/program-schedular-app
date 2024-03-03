import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cohort } from './cohorts.entity';
import { InstructorsPeriodOfDays } from './instructorsPeriodOfDays.entity';

@Entity('master_period_of_days')
export class MasterPeriodOfDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar' })
  time: string;

  @OneToMany(() => Cohort, (cohort) => cohort.periodOfDay)
  cohorts: Cohort[];

  @OneToMany(
    () => InstructorsPeriodOfDays,
    (instructorsPeriodOfDays) => instructorsPeriodOfDays.periodOfDay,
  )
  availableInstructors: InstructorsPeriodOfDays[];
}
