import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cohort } from './cohorts.entity';

@Entity('intakes')
export class Intake {
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

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Cohort, (cohort) => cohort.intake, {
    cascade: true,
  })
  cohorts: Cohort[];
}
