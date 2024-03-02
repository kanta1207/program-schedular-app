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
import { Program } from './programs.entity';
import { Class } from './classes.entity';
import { CoursesInstructors } from './coursesInstructors.entity';

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

  @ManyToOne(() => Program, (program) => program.courses)
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
