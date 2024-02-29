import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('programs')
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;
}
