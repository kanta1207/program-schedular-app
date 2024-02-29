import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('weekdays_ranges')
export class WeekdaysRange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['Monday - Friday', 'Monday - Wednesday', 'Wednesday - Friday'],
  })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
