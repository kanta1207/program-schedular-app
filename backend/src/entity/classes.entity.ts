import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cohort } from './cohorts.entity';

import { Course } from './course.entity';
import { MasterClassroom } from './masterClassrooms.entity';
import { MasterWeekdaysRange } from './masterWeekdaysRanges.entity';

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

  @ManyToOne(() => Cohort, (cohort) => cohort.classes)
  @JoinColumn({ name: 'cohort_id' })
  cohort: Cohort;

  @ManyToOne(
    () => MasterWeekdaysRange,
    (masterWeekdaysRange) => masterWeekdaysRange.classes,
  )
  @JoinColumn({ name: 'range_id' })
  weekdaysRange: MasterWeekdaysRange;

  @ManyToOne(() => Course, (course) => course.classes)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(
    () => MasterClassroom,
    (masterClassroom) => masterClassroom.classes,
  )
  @JoinColumn({ name: 'classroom_id' })
  classroom: MasterClassroom;
}
