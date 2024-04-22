import dataSource from '../data-source';
import { Cohort } from '../entity';
import { seederWrapper } from './utils';

const cohorts = [
  {
    // 1
    name: 'M-1023',
    intake: { id: 2 },
    periodOfDay: { id: 1 },
    program: { id: 1 },
  },
  {
    // 2
    name: 'A-1023',
    intake: { id: 2 },
    periodOfDay: { id: 2 },
    program: { id: 1 },
  },
  {
    // 3
    name: 'E1-1023',
    intake: { id: 2 },
    periodOfDay: { id: 3 },
    program: { id: 1 },
  },
  {
    // 4
    name: 'E2-1023',
    intake: { id: 2 },
    periodOfDay: { id: 3 },
    program: { id: 1 },
  },
  {
    // 5
    name: 'A1-0124',
    intake: { id: 4 },
    periodOfDay: { id: 2 },
    program: { id: 1 },
  },
  {
    // 6
    name: 'E1-0124',
    intake: { id: 4 },
    periodOfDay: { id: 3 },
    program: { id: 1 },
  },
  {
    // 7
    name: 'E2-0124',
    intake: { id: 4 },
    periodOfDay: { id: 3 },
    program: { id: 1 },
  },
  {
    // 8
    name: 'E-0923',
    intake: { id: 1 },
    periodOfDay: { id: 3 },
    program: { id: 2 },
  },
  {
    // 9
    name: 'E-1223',
    intake: { id: 3 },
    periodOfDay: { id: 3 },
    program: { id: 2 },
  },
  {
    // 10
    name: 'E-0324',
    intake: { id: 5 },
    periodOfDay: { id: 3 },
    program: { id: 2 },
  },
  {
    // 11
    name: 'M1-0424',
    intake: { id: 6 },
    periodOfDay: { id: 1 },
    program: { id: 1 },
  },
  {
    // 12
    name: 'A1-0424',
    intake: { id: 6 },
    periodOfDay: { id: 2 },
    program: { id: 1 },
  },
  {
    // 13
    name: 'E1-0424',
    intake: { id: 6 },
    periodOfDay: { id: 3 },
    program: { id: 1 },
  },
  {
    // 14
    name: 'E2-0424',
    intake: { id: 6 },
    periodOfDay: { id: 3 },
    program: { id: 1 },
  },
  {
    // 15
    name: 'E-0624',
    intake: { id: 7 },
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
