import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Intake } from './intakes.entity';
import { Program } from './programs.entity';
import { MasterPeriodOfDay } from './masterPeriodOfDays.entity';

@Entity('cohorts')
export class Cohort {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => Intake, (intake) => intake.cohorts)
  @JoinColumn({ name: 'intake_id' })
  intake: Intake;

  @ManyToOne(() => MasterPeriodOfDay, (periodOfDay) => periodOfDay.cohorts)
  @JoinColumn({ name: 'period_of_day_id' })
  periodOfDay: MasterPeriodOfDay;

  @ManyToOne(() => Program, (program) => program.cohorts)
  @JoinColumn({ name: 'program_id' })
  program: Program;
}
