import dataSource from '../data-source';
import { MasterClassroom } from '../entity/masterClassrooms.entity';
import { seederWrapper } from './utils';

const classrooms = [
  { name: 'Google', floor: '2nd' },
  { name: 'Youtube', floor: '2nd' },
  { name: 'Uber', floor: '2nd' },
  { name: 'Amazon', floor: '3rd' },
  { name: 'Facebook', floor: '3rd' },
  { name: 'Apple', floor: '4th' },
  { name: 'Hootsuite', floor: '4th' },
  { name: 'Microsoft', floor: '4th' },
].map((classroom, i) => {
  return { id: i + 1, ...classroom };
});

export const masterClassroomSeeder = async () => {
  await seederWrapper('master_classrooms', async () => {
    const masterClassroomRepo = dataSource.getRepository(MasterClassroom);
    await masterClassroomRepo.save(classrooms);
  });
};
