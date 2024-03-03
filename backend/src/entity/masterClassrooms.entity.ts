import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Class } from './classes.entity';

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

  @OneToMany(() => Class, (clazz) => clazz.classroom)
  classes: Class[];
}
