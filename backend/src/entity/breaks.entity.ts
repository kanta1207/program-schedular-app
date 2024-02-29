import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Break {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  startAt: string;

  @Column({ type: 'date' })
  endAt: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
