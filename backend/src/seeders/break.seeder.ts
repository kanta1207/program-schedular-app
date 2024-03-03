import dataSource from '../data-source';
import { Break } from '../entity/breaks.entity';
import { seederWrapper } from './utils';

const breaks = [
  {
    startAt: new Date('2023-06-26'),
    endAt: new Date('2023-06-30'),
  },
  {
    startAt: new Date('2023-12-18'),
    endAt: new Date('2023-12-29'),
  },
  {
    startAt: new Date('2024-03-25'),
    endAt: new Date('2024-03-29'),
  },
  {
    startAt: new Date('2024-06-24'),
    endAt: new Date('2024-06-28'),
  },
  {
    startAt: new Date('2024-08-26'),
    endAt: new Date('2024-08-30'),
  },
].map((breakItem, i) => {
  return { id: i + 1, ...breakItem };
});

export const breakSeeder = async () => {
  await seederWrapper('breaks', async () => {
    const breakRepo = dataSource.getRepository(Break);
    await breakRepo.save(breaks);
  });
};
