import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Instructor } from './instructor.entity';

@Entity('master_contract_types')
export class MasterContractType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int', nullable: true })
  maxHours: number | null;

  @Column({ type: 'int', nullable: true })
  minHours: number | null;

  @OneToMany(() => Instructor, (instructors) => instructors.contractType)
  instructors: Instructor[];
}
