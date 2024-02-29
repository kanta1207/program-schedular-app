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
import { WeekdaysRange } from './masterWeekdaysRanges.entity';

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

  @ManyToOne(() => WeekdaysRange, (weekdaysRange) => weekdaysRange.classes)
  @JoinColumn({ name: 'range_id' })
  weekdaysRange: WeekdaysRange;
}
