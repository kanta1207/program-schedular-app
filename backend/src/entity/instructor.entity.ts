import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MasterContractType } from './masterContractTypes.entity';
import { MasterWeekdaysRange } from './masterWeekdaysRanges.entity';
import { CoursesInstructors } from './coursesInstructors.entity';
import { InstructorsPeriodOfDays } from './instructorsPeriodOfDays.entity';

@Entity('instructors')
export class Instructor {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'text' })
  note: string;

  @Column({ name: 'desired_working_hours', type: 'int', nullable: true })
  desiredWorkingHours: number;

  @ManyToOne(
    () => MasterContractType,
    (contractType) => contractType.instructors,
  )
  @JoinColumn({ name: 'contract_type_id' })
  contractType: MasterContractType;

  @ManyToOne(
    () => MasterWeekdaysRange,
    (weekdaysRange) => weekdaysRange.instructors,
  )
  @JoinColumn({ name: 'range_id' })
  weekdaysRange: MasterWeekdaysRange;

  @OneToMany(
    () => CoursesInstructors,
    (coursesInstructors) => coursesInstructors.instructor,
  )
  availableCourses: CoursesInstructors[];

  @OneToMany(
    () => InstructorsPeriodOfDays,
    (instructorsPeriodOfDays) => instructorsPeriodOfDays.instructor,
  )
  availablePeriodOfDays: InstructorsPeriodOfDays[];
}
