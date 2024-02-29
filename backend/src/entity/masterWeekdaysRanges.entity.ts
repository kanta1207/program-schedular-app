import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Class } from './classes.entity';

@Entity('weekdays_ranges')
export class WeekdaysRange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @OneToMany(() => Class, (clazz) => clazz.weekdaysRange)
  classes: Class[];
}
