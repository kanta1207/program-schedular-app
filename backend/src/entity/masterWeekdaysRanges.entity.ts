import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Class, Instructor } from './';

@Entity('master_weekdays_ranges')
export class MasterWeekdaysRange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @OneToMany(() => Class, (clazz) => clazz.weekdaysRange)
  classes: Class[];

  @OneToMany(() => Instructor, (instructor) => instructor.weekdaysRange)
  instructors: Instructor[];
}
