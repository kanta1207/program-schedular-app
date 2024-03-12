import dataSource from '../data-source';
import { Cohort } from '../entity';
import { seederWrapper } from './utils';

const cohorts = [
  {
    name: 'M-1023',
    intake: { id: 2 },
    periodOfDay: { id: 1 },
    program: { id: 1 },
  },
  {
    name: 'A-1023',
    intake: { id: 2 },
    periodOfDay: { id: 2 },
    program: { id: 1 },
  },
  {
    name: 'E1-1023',
    intake: { id: 2 },
    periodOfDay: { id: 3 },
    program: { id: 1 },
  },
  {
    name: 'E2-1023',
    intake: { id: 2 },
    periodOfDay: { id: 3 },
    program: { id: 1 },
  },
  {
    name: 'A1-0124',
    intake: { id: 4 },
    periodOfDay: { id: 2 },
    program: { id: 1 },
  },
  {
    name: 'E1-0124',
    intake: { id: 4 },
    periodOfDay: { id: 3 },
    program: { id: 1 },
  },
  {
    name: 'E2-0124',
    intake: { id: 4 },
    periodOfDay: { id: 3 },
    program: { id: 1 },
  },
  {
    name: 'E-0923',
    intake: { id: 1 },
    periodOfDay: { id: 3 },
    program: { id: 2 },
  },
  {
    name: 'E-1223',
    intake: { id: 3 },
    periodOfDay: { id: 3 },
    program: { id: 2 },
  },
  {
    name: 'E-0324',
    intake: { id: 5 },
    periodOfDay: { id: 3 },
    program: { id: 2 },
  },
].map((cohort, i) => {
  return { id: i + 1, ...cohort };
});

export const cohortSeeder = async () => {
  await seederWrapper('cohorts', async () => {
    const cohortRepo = dataSource.getRepository(Cohort);
    await cohortRepo.save(cohorts);
  });
};
