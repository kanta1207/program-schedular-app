import dataSource from '../data-source';
import { InstructorsPeriodOfDays } from '../entity/instructorsPeriodOfDays.entity';
import { seederWrapper } from './utils';

const instructorsPeriodOfDays = [
  { instructor: { id: 1 }, periodOfDay: { id: 1 } },
  { instructor: { id: 1 }, periodOfDay: { id: 2 } },
  { instructor: { id: 1 }, periodOfDay: { id: 3 } },
  { instructor: { id: 2 }, periodOfDay: { id: 3 } },
  { instructor: { id: 3 }, periodOfDay: { id: 3 } },
  { instructor: { id: 4 }, periodOfDay: { id: 3 } },
  { instructor: { id: 5 }, periodOfDay: { id: 3 } },
  { instructor: { id: 6 }, periodOfDay: { id: 3 } },
  { instructor: { id: 7 }, periodOfDay: { id: 3 } },
  { instructor: { id: 8 }, periodOfDay: { id: 2 } },
  { instructor: { id: 8 }, periodOfDay: { id: 3 } },
  { instructor: { id: 9 }, periodOfDay: { id: 1 } },
  { instructor: { id: 9 }, periodOfDay: { id: 2 } },
  { instructor: { id: 9 }, periodOfDay: { id: 3 } },
  { instructor: { id: 10 }, periodOfDay: { id: 1 } },
  { instructor: { id: 10 }, periodOfDay: { id: 2 } },
  { instructor: { id: 10 }, periodOfDay: { id: 3 } },
  { instructor: { id: 11 }, periodOfDay: { id: 1 } },
  { instructor: { id: 11 }, periodOfDay: { id: 2 } },
  { instructor: { id: 11 }, periodOfDay: { id: 3 } },
  { instructor: { id: 12 }, periodOfDay: { id: 3 } },
  { instructor: { id: 13 }, periodOfDay: { id: 3 } },
  { instructor: { id: 14 }, periodOfDay: { id: 1 } },
  { instructor: { id: 14 }, periodOfDay: { id: 2 } },
  { instructor: { id: 14 }, periodOfDay: { id: 3 } },
  { instructor: { id: 15 }, periodOfDay: { id: 1 } },
  { instructor: { id: 15 }, periodOfDay: { id: 2 } },
  { instructor: { id: 15 }, periodOfDay: { id: 3 } },
  { instructor: { id: 16 }, periodOfDay: { id: 1 } },
  { instructor: { id: 16 }, periodOfDay: { id: 2 } },
  { instructor: { id: 16 }, periodOfDay: { id: 3 } },
  { instructor: { id: 17 }, periodOfDay: { id: 1 } },
  { instructor: { id: 17 }, periodOfDay: { id: 2 } },
  { instructor: { id: 17 }, periodOfDay: { id: 3 } },
  { instructor: { id: 18 }, periodOfDay: { id: 1 } },
  { instructor: { id: 18 }, periodOfDay: { id: 2 } },
  { instructor: { id: 18 }, periodOfDay: { id: 3 } },
  { instructor: { id: 19 }, periodOfDay: { id: 1 } },
  { instructor: { id: 19 }, periodOfDay: { id: 2 } },
  { instructor: { id: 19 }, periodOfDay: { id: 3 } },
  { instructor: { id: 20 }, periodOfDay: { id: 1 } },
  { instructor: { id: 21 }, periodOfDay: { id: 3 } },
  { instructor: { id: 22 }, periodOfDay: { id: 1 } },
  { instructor: { id: 22 }, periodOfDay: { id: 2 } },
  { instructor: { id: 22 }, periodOfDay: { id: 3 } },
].map((instructorsPeriodOfDay, i) => {
  return { id: i + 1, ...instructorsPeriodOfDay };
});

export const instructorsPeriodOfDaysSeeder = async () => {
  await seederWrapper('instructors_period_of_days', async () => {
    const instructorsPeriodOfDaysRepo = dataSource.getRepository(
      InstructorsPeriodOfDays,
    );
    await instructorsPeriodOfDaysRepo.save(instructorsPeriodOfDays);
  });
};
