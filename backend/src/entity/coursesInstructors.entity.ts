import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';
import { Instructor } from './instructor.entity';

@Entity('courses_instructors')
export class CoursesInstructors {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Instructor, (instructor) => instructor.courses)
  @JoinColumn({ name: 'instructor_id' })
  instructor: Instructor;

  @ManyToOne(() => Course, (course) => course.availableInstructors)
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
