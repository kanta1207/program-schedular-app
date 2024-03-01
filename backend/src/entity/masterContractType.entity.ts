import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('master_contract_types')
export class MasterContractType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int', name: 'max_hours', nullable: true })
  maxHours: number | null;

  @Column({ type: 'int', name: 'min_hours', nullable: true })
  minHours: number | null;
}
