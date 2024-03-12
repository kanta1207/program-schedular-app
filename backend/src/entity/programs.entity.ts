import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cohort, Course } from './';

@Entity('programs')
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Cohort, (cohort) => cohort.program)
  cohorts: Cohort[];

  @OneToMany(() => Course, (course) => course.program)
  courses: Course[];
}
