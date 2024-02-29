import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('weekdays_ranges')
export class WeekdaysRange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;
}
