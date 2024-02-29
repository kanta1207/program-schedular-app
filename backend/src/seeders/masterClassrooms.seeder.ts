import dataSource from '../data-source';
import { MasterClassroom } from '../entity/masterClassrooms.entity';
import { truncateTable } from './utils';

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
  await truncateTable('master_classrooms');

  const masterClassroomRepository = dataSource.getRepository(MasterClassroom);
  classrooms.map((classroom) => masterClassroomRepository.create(classroom));
  await masterClassroomRepository.save(classrooms);
  console.log('MasterClassroom seeds inserted');
};
