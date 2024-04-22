import dataSource from '../data-source';
import { MasterClassroom } from '../entity';
import { seederWrapper } from './utils';

const classrooms = [
  { name: 'Google', floor: '2nd' }, // 1
  { name: 'Youtube', floor: '2nd' }, // 2
  { name: 'Uber', floor: '2nd' }, // 3
  { name: 'Amazon', floor: '3rd' }, // 4
  { name: 'Facebook', floor: '3rd' }, // 5
  { name: 'Apple', floor: '4th' }, // 6
  { name: 'Hootsuite', floor: '4th' }, // 7
  { name: 'Microsoft', floor: '4th' }, // 8
].map((classroom, i) => {
  return { id: i + 1, ...classroom };
});

export const masterClassroomSeeder = async () => {
  await seederWrapper('master_classrooms', async () => {
    const masterClassroomRepo = dataSource.getRepository(MasterClassroom);
    await masterClassroomRepo.save(classrooms);
  });
};
