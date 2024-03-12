import dataSource from '../data-source';
import { Break } from 'src/entity';
import { seederWrapper } from './utils';

const breaks = [
  {
    startAt: new Date('2023-06-26T08:00:00.000Z'),
    endAt: new Date('2023-06-30T08:00:00.000Z'),
  },
  {
    startAt: new Date('2023-12-18T08:00:00.000Z'),
    endAt: new Date('2023-12-29T08:00:00.000Z'),
  },
  {
    startAt: new Date('2024-03-25T08:00:00.000Z'),
    endAt: new Date('2024-03-29T08:00:00.000Z'),
  },
  {
    startAt: new Date('2024-06-24T08:00:00.000Z'),
    endAt: new Date('2024-06-28T08:00:00.000Z'),
  },
  {
    startAt: new Date('2024-08-26T08:00:00.000Z'),
    endAt: new Date('2024-08-30T08:00:00.000Z'),
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
