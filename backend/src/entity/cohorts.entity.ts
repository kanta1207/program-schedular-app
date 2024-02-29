import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Intake } from './intakes.entity';
import { Program } from './programs.entity';
import { MasterPeriodOfDay } from './masterPeriodOfDays.entity';

@Entity('cohorts')
export class Cohort {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
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
