import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Instructor } from './instructor.entity';
import { MasterPeriodOfDay } from './masterPeriodOfDays.entity';

@Entity('instructors_period_of_days')
export class InstructorsPeriodOfDays {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Instructor, (instructor) => instructor.periodOfDays)
  @JoinColumn({ name: 'instructor_id' })
  instructor: Instructor;

  @ManyToOne(
    () => MasterPeriodOfDay,
    (periodOfDay) => periodOfDay.availableInstructors,
  )
  @JoinColumn({ name: 'period_of_day_id' })
  periodOfDay: MasterPeriodOfDay;
}
