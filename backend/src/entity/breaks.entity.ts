import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('breaks')
export class Break {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'start_at', type: 'date' })
  startAt: string;

  @Column({ name: 'end_at', type: 'date' })
  endAt: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: string;
}
