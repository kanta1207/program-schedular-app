import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('master_classrooms')
export class MasterClassroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: [
      'Google',
      'Youtube',
      'Uber',
      'Amazon',
      'Facebook',
      'Apple',
      'Hootsuite',
      'Microsoft',
    ],
  })
  name: string;

  @Column({ type: 'enum', enum: ['2nd', '3rd', '4th'] })
  floor: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
