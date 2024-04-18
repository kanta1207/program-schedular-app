import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  Class,
  InstructorsPeriodOfDays,
  CoursesInstructors,
  MasterContractType,
  MasterWeekdaysRange,
} from './';

@Entity('instructors')
export class Instructor {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  note: string | null;

  @Column({ name: 'desired_working_hours', type: 'int', nullable: true })
  desiredWorkingHours: number | null;

  @ManyToOne(
    () => MasterContractType,
    (contractType) => contractType.instructors,
    { nullable: false },
  )
  @JoinColumn({ name: 'contract_type_id' })
  contractType: MasterContractType;

  @ManyToOne(
    () => MasterWeekdaysRange,
    (weekdaysRange) => weekdaysRange.instructors,
    { nullable: false },
  )
  @JoinColumn({ name: 'range_id' })
  weekdaysRange: MasterWeekdaysRange;

  @OneToMany(() => Class, (clazz) => clazz.instructor)
  classes: Class[];

  @OneToMany(
    () => CoursesInstructors,
    (coursesInstructors) => coursesInstructors.instructor,
    { onDelete: 'CASCADE' },
  )
  courses: CoursesInstructors[];

  @OneToMany(
    () => InstructorsPeriodOfDays,
    (instructorsPeriodOfDays) => instructorsPeriodOfDays.instructor,
    { onDelete: 'CASCADE' },
  )
  periodOfDays: InstructorsPeriodOfDays[];
}
