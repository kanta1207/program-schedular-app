import dataSource from '../data-source';
import { Intake } from '../entity/intakes.entity';
import { seederWrapper } from './utils';

const intakes = [
  {
    name: '2023 August DMA',
    startAt: new Date('2023-08-28'),
    endAt: new Date('2024-02-23'),
  },
  {
    name: '2023 September DMS',
    startAt: new Date('2023-09-25'),
    endAt: new Date('2024-03-22'),
  },
  {
    name: '2023 November DMA',
    startAt: new Date('2023-11-20'),
    endAt: new Date('2024-05-24'),
  },
  {
    name: '2024 January DMS',
    startAt: new Date('2024-01-02'),
    endAt: new Date('2024-06-21'),
  },
  {
    name: '2023 March DMA',
    startAt: new Date('2024-02-26'),
    endAt: new Date('2024-08-23'),
  },
].map((intake, i) => {
  return { id: i + 1, ...intake };
});

export const intakeSeeder = async () => {
  await seederWrapper('intakes', async () => {
    const intakeRepo = dataSource.getRepository(Intake);
    await intakeRepo.save(intakes);
  });
};
