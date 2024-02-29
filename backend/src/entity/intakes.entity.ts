import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cohort } from './cohorts.entity';

@Entity('intakes')
export class Intake {
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
