import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Instructor, MasterPeriodOfDay } from './';

@Entity('instructors_period_of_days')
export class InstructorsPeriodOfDays {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Instructor, (instructor) => instructor.periodOfDays, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'instructor_id' })
  instructor: Instructor;

  @ManyToOne(
    () => MasterPeriodOfDay,
    (periodOfDay) => periodOfDay.availableInstructors,
    { nullable: false },
  )
  @JoinColumn({ name: 'period_of_day_id' })
  periodOfDay: MasterPeriodOfDay;
}
