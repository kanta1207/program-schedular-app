import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CoursesInstructors, Class, Program } from './';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'required_hours', type: 'int' })
  requiredHours: number;

  @ManyToOne(() => Program, (program) => program.courses, { nullable: false })
  @JoinColumn({ name: 'program_id' })
  program: Program;

  @OneToMany(() => Class, (clazz) => clazz.course)
  classes: Class[];

  @OneToMany(
    () => CoursesInstructors,
    (coursesInstructors) => coursesInstructors.instructor,
  )
  availableInstructors: CoursesInstructors[];
}
