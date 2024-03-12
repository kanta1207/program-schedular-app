import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  Instructor,
  Cohort,
  Course,
  MasterClassroom,
  MasterWeekdaysRange,
} from './';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'start_at', type: 'timestamp' })
  startAt: Date;

  @Column({ name: 'end_at', type: 'timestamp' })
  endAt: Date;

  @ManyToOne(() => Cohort, (cohort) => cohort.classes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cohort_id' })
  cohort: Cohort;

  @ManyToOne(
    () => MasterWeekdaysRange,
    (masterWeekdaysRange) => masterWeekdaysRange.classes,
    { nullable: false },
  )
  @JoinColumn({ name: 'range_id' })
  weekdaysRange: MasterWeekdaysRange;

  @ManyToOne(() => Course, (course) => course.classes, { nullable: false })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(
    () => MasterClassroom,
    (masterClassroom) => masterClassroom.classes,
    { nullable: false },
  )
  @JoinColumn({ name: 'classroom_id' })
  classroom: MasterClassroom;

  @ManyToOne(() => Instructor, (instructor) => instructor.classes, {
    nullable: true,
  })
  @JoinColumn({ name: 'instructor_id' })
  instructor: Instructor;
}
