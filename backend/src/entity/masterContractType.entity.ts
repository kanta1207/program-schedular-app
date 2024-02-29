import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('master_contract_types')
export class MasterContractType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['Full time', 'Part time', 'Contract'] })
  name: string;

  @Column({ type: 'int', nullable: true })
  maxHours: number | null;

  @Column({ type: 'int', nullable: true })
  minHours: number | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
