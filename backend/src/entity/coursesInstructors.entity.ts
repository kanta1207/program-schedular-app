import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Instructor, Course } from './';

@Entity('courses_instructors')
export class CoursesInstructors {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Instructor, (instructor) => instructor.courses, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'instructor_id' })
  instructor: Instructor;

  @ManyToOne(() => Course, (course) => course.availableInstructors, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
