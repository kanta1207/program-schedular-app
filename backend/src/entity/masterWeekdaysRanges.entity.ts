import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('master_weekdays_ranges')
export class MasterWeekdaysRange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;
}
