import dataSource from '../data-source';
import { CoursesInstructors } from 'src/entity';
import { seederWrapper } from './utils';

const coursesInstructors = [
  { instructor: { id: 1 }, course: { id: 1 } },
  { instructor: { id: 1 }, course: { id: 5 } },
  { instructor: { id: 1 }, course: { id: 6 } },
  { instructor: { id: 1 }, course: { id: 8 } },
  { instructor: { id: 1 }, course: { id: 9 } },
  { instructor: { id: 1 }, course: { id: 15 } },
  { instructor: { id: 2 }, course: { id: 1 } },
  { instructor: { id: 2 }, course: { id: 5 } },
  { instructor: { id: 2 }, course: { id: 7 } },
  { instructor: { id: 2 }, course: { id: 8 } },
  { instructor: { id: 2 }, course: { id: 10 } },
  { instructor: { id: 2 }, course: { id: 12 } },
  { instructor: { id: 2 }, course: { id: 13 } },
  { instructor: { id: 2 }, course: { id: 14 } },
  { instructor: { id: 2 }, course: { id: 15 } },
  { instructor: { id: 3 }, course: { id: 1 } },
  { instructor: { id: 3 }, course: { id: 5 } },
  { instructor: { id: 3 }, course: { id: 8 } },
  { instructor: { id: 4 }, course: { id: 2 } },
  { instructor: { id: 5 }, course: { id: 1 } },
  { instructor: { id: 5 }, course: { id: 4 } },
  { instructor: { id: 5 }, course: { id: 5 } },
  { instructor: { id: 5 }, course: { id: 6 } },
  { instructor: { id: 5 }, course: { id: 7 } },
  { instructor: { id: 5 }, course: { id: 8 } },
  { instructor: { id: 6 }, course: { id: 4 } },
  { instructor: { id: 6 }, course: { id: 13 } },
  { instructor: { id: 6 }, course: { id: 14 } },
  { instructor: { id: 7 }, course: { id: 6 } },
  { instructor: { id: 7 }, course: { id: 8 } },
  { instructor: { id: 7 }, course: { id: 15 } },
  { instructor: { id: 8 }, course: { id: 1 } },
  { instructor: { id: 8 }, course: { id: 6 } },
  { instructor: { id: 8 }, course: { id: 7 } },
  { instructor: { id: 8 }, course: { id: 8 } },
  { instructor: { id: 8 }, course: { id: 9 } },
  { instructor: { id: 8 }, course: { id: 11 } },
  { instructor: { id: 9 }, course: { id: 1 } },
  { instructor: { id: 9 }, course: { id: 2 } },
  { instructor: { id: 9 }, course: { id: 3 } },
  { instructor: { id: 9 }, course: { id: 5 } },
  { instructor: { id: 9 }, course: { id: 6 } },
  { instructor: { id: 9 }, course: { id: 8 } },
  { instructor: { id: 9 }, course: { id: 15 } },
  { instructor: { id: 10 }, course: { id: 1 } },
  { instructor: { id: 10 }, course: { id: 4 } },
  { instructor: { id: 10 }, course: { id: 5 } },
  { instructor: { id: 10 }, course: { id: 7 } },
  { instructor: { id: 10 }, course: { id: 8 } },
  { instructor: { id: 11 }, course: { id: 1 } },
  { instructor: { id: 11 }, course: { id: 2 } },
  { instructor: { id: 11 }, course: { id: 3 } },
  { instructor: { id: 11 }, course: { id: 5 } },
  { instructor: { id: 11 }, course: { id: 6 } },
  { instructor: { id: 11 }, course: { id: 8 } },
  { instructor: { id: 12 }, course: { id: 1 } },
  { instructor: { id: 12 }, course: { id: 5 } },
  { instructor: { id: 12 }, course: { id: 11 } },
  { instructor: { id: 12 }, course: { id: 14 } },
  { instructor: { id: 13 }, course: { id: 7 } },
  { instructor: { id: 13 }, course: { id: 13 } },
  { instructor: { id: 14 }, course: { id: 1 } },
  { instructor: { id: 14 }, course: { id: 2 } },
  { instructor: { id: 14 }, course: { id: 3 } },
  { instructor: { id: 14 }, course: { id: 4 } },
  { instructor: { id: 14 }, course: { id: 5 } },
  { instructor: { id: 14 }, course: { id: 6 } },
  { instructor: { id: 14 }, course: { id: 7 } },
  { instructor: { id: 14 }, course: { id: 8 } },
  { instructor: { id: 14 }, course: { id: 12 } },
  { instructor: { id: 14 }, course: { id: 14 } },
  { instructor: { id: 14 }, course: { id: 15 } },
  { instructor: { id: 15 }, course: { id: 3 } },
  { instructor: { id: 16 }, course: { id: 1 } },
  { instructor: { id: 16 }, course: { id: 5 } },
  { instructor: { id: 16 }, course: { id: 6 } },
  { instructor: { id: 16 }, course: { id: 8 } },
  { instructor: { id: 17 }, course: { id: 1 } },
  { instructor: { id: 17 }, course: { id: 4 } },
  { instructor: { id: 17 }, course: { id: 5 } },
  { instructor: { id: 17 }, course: { id: 6 } },
  { instructor: { id: 17 }, course: { id: 8 } },
  { instructor: { id: 18 }, course: { id: 1 } },
  { instructor: { id: 18 }, course: { id: 5 } },
  { instructor: { id: 18 }, course: { id: 6 } },
  { instructor: { id: 18 }, course: { id: 8 } },
  { instructor: { id: 18 }, course: { id: 15 } },
  { instructor: { id: 19 }, course: { id: 2 } },
  { instructor: { id: 19 }, course: { id: 4 } },
  { instructor: { id: 20 }, course: { id: 2 } },
  { instructor: { id: 20 }, course: { id: 3 } },
  { instructor: { id: 21 }, course: { id: 1 } },
  { instructor: { id: 21 }, course: { id: 5 } },
  { instructor: { id: 21 }, course: { id: 6 } },
  { instructor: { id: 21 }, course: { id: 8 } },
  { instructor: { id: 21 }, course: { id: 9 } },
  { instructor: { id: 21 }, course: { id: 11 } },
  { instructor: { id: 22 }, course: { id: 1 } },
  { instructor: { id: 22 }, course: { id: 5 } },
  { instructor: { id: 22 }, course: { id: 6 } },
  { instructor: { id: 22 }, course: { id: 8 } },
].map((coursesInstructor, i) => {
  return { id: i + 1, ...coursesInstructor };
});

export const coursesInstructorsSeeder = async () => {
  await seederWrapper('course_instructors', async () => {
    const coursesInstructorsRepo = dataSource.getRepository(CoursesInstructors);
    await coursesInstructorsRepo.save(coursesInstructors);
  });
};
