import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('master_classrooms')
export class MasterClassroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  floor: string;
}
