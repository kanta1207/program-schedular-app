import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cohort } from './cohorts.entity';

@Entity('programs')
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Cohort, (cohort) => cohort.program, {
    cascade: true,
  })
  cohorts: Cohort[];
}
