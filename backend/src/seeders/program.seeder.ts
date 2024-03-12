import dataSource from '../data-source';
import { Program } from 'src/entity';
import { seederWrapper } from './utils';

const programs = [
  {
    name: 'DMS',
  },
  {
    name: 'DMA',
  },
].map((program, i) => {
  return { id: i + 1, ...program };
});

export const programSeeder = async () => {
  await seederWrapper('programs', async () => {
    const programRepo = dataSource.getRepository(Program);
    await programRepo.save(programs);
  });
};
