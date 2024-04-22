import dataSource from '../data-source';
import { InstructorsPeriodOfDays } from '../entity';
import { seederWrapper } from './utils';

const instructorsPeriodOfDays = [
  // Ana Couto
  { instructor: { id: 1 }, periodOfDay: { id: 1 } },
  { instructor: { id: 1 }, periodOfDay: { id: 2 } },
  { instructor: { id: 1 }, periodOfDay: { id: 3 } },
  // Brian
  { instructor: { id: 2 }, periodOfDay: { id: 3 } },
  // Caio Franco
  { instructor: { id: 3 }, periodOfDay: { id: 3 } },
  // Diogo
  { instructor: { id: 4 }, periodOfDay: { id: 3 } },
  // Gaurav
  { instructor: { id: 5 }, periodOfDay: { id: 3 } },
  // Iman
  { instructor: { id: 6 }, periodOfDay: { id: 3 } },
  // Jana
  { instructor: { id: 7 }, periodOfDay: { id: 3 } },
  // Kwame
  { instructor: { id: 8 }, periodOfDay: { id: 2 } },
  { instructor: { id: 8 }, periodOfDay: { id: 3 } },
  // Mariam
  { instructor: { id: 9 }, periodOfDay: { id: 1 } },
  { instructor: { id: 9 }, periodOfDay: { id: 2 } },
  { instructor: { id: 9 }, periodOfDay: { id: 3 } },
  // Rafael
  { instructor: { id: 10 }, periodOfDay: { id: 1 } },
  { instructor: { id: 10 }, periodOfDay: { id: 2 } },
  { instructor: { id: 10 }, periodOfDay: { id: 3 } },
  // Rodrigo
  { instructor: { id: 11 }, periodOfDay: { id: 1 } },
  { instructor: { id: 11 }, periodOfDay: { id: 2 } },
  // Vedant
  { instructor: { id: 12 }, periodOfDay: { id: 3 } },
  // Amir
  { instructor: { id: 13 }, periodOfDay: { id: 3 } },
  // Andres Franco
  { instructor: { id: 14 }, periodOfDay: { id: 1 } },
  { instructor: { id: 14 }, periodOfDay: { id: 2 } },
  { instructor: { id: 14 }, periodOfDay: { id: 3 } },
  // Aswini
  { instructor: { id: 15 }, periodOfDay: { id: 1 } },
  { instructor: { id: 15 }, periodOfDay: { id: 2 } },
  { instructor: { id: 15 }, periodOfDay: { id: 3 } },
  // Brigitte
  { instructor: { id: 16 }, periodOfDay: { id: 1 } },
  { instructor: { id: 16 }, periodOfDay: { id: 2 } },
  { instructor: { id: 16 }, periodOfDay: { id: 3 } },
  // Cody
  { instructor: { id: 17 }, periodOfDay: { id: 3 } },
  // Daria Astanaeva
  { instructor: { id: 18 }, periodOfDay: { id: 1 } },
  { instructor: { id: 18 }, periodOfDay: { id: 2 } },
  { instructor: { id: 18 }, periodOfDay: { id: 3 } },
  // Elmira
  { instructor: { id: 19 }, periodOfDay: { id: 1 } },
  { instructor: { id: 19 }, periodOfDay: { id: 2 } },
  { instructor: { id: 19 }, periodOfDay: { id: 3 } },
  // Jasleen
  { instructor: { id: 20 }, periodOfDay: { id: 1 } },
  // Rafaela
  { instructor: { id: 21 }, periodOfDay: { id: 3 } },
  // Tiago
  { instructor: { id: 22 }, periodOfDay: { id: 1 } },
  { instructor: { id: 22 }, periodOfDay: { id: 2 } },
  { instructor: { id: 22 }, periodOfDay: { id: 3 } },
  // Mariana
  { instructor: { id: 23 }, periodOfDay: { id: 1 } },
  { instructor: { id: 23 }, periodOfDay: { id: 2 } },
  { instructor: { id: 23 }, periodOfDay: { id: 3 } },
  // Nathalia
  { instructor: { id: 24 }, periodOfDay: { id: 3 } },
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
