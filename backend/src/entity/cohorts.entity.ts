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
import { Intake } from './intakes.entity';
import { Program } from './programs.entity';
import { MasterPeriodOfDay } from './masterPeriodOfDays.entity';
import { Class } from './classes.entity';

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

  @ManyToOne(() => Intake, (intake) => intake.cohorts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'intake_id' })
  intake: Intake;

  @ManyToOne(() => MasterPeriodOfDay, (periodOfDay) => periodOfDay.cohorts, {
    nullable: false,
  })
  @JoinColumn({ name: 'period_of_day_id' })
  periodOfDay: MasterPeriodOfDay;

  @ManyToOne(() => Program, (program) => program.cohorts, { nullable: false })
  @JoinColumn({ name: 'program_id' })
  program: Program;

  @OneToMany(() => Class, (clazz) => clazz.cohort, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  classes: Class[];
}
