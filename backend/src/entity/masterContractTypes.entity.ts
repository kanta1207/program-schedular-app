import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Instructor } from './';

@Entity('master_contract_types')
export class MasterContractType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'max_hours', type: 'int', nullable: true })
  maxHours: number | null;

  @Column({ name: 'min_hours', type: 'int', nullable: true })
  minHours: number | null;

  @OneToMany(() => Instructor, (instructors) => instructors.contractType)
  instructors: Instructor[];
}
