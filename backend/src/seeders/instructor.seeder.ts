import dataSource from '../data-source';
import { Instructor } from '../entity';
import { seederWrapper } from './utils';

const instructors = [
  {
    // 1
    name: 'Ana Couto',
    isActive: true,
    desiredWorkingHours: 20,
    note: '',
    contractType: { id: 3 },
    weekdaysRange: { id: 1 },
  },
  {
    // 2
    name: 'Brian',
    isActive: true,
    desiredWorkingHours: 40,
    note: '',
    contractType: { id: 3 },
    weekdaysRange: { id: 1 },
  },
  {
    // 3
    name: 'Caio Franco',
    isActive: true,
    desiredWorkingHours: 20,
    note: '',
    contractType: { id: 3 },
    weekdaysRange: { id: 1 },
  },
  {
    // 4
    name: 'Diogo',
    isActive: true,
    desiredWorkingHours: null,
    note: '',
    contractType: { id: 2 },
    weekdaysRange: { id: 1 },
  },
  {
    // 5
    name: 'Gaurav',
    isActive: true,
    desiredWorkingHours: null,
    note: '',
    contractType: { id: 2 },
    weekdaysRange: { id: 1 },
  },
  {
    // 6
    name: 'Iman',
    isActive: true,
    desiredWorkingHours: 10,
    note: '',
    contractType: { id: 3 },
    weekdaysRange: { id: 1 },
  },
  {
    // 7
    name: 'Jana',
    isActive: true,
    desiredWorkingHours: 20,
    note: '',
    contractType: { id: 3 },
    weekdaysRange: { id: 1 },
  },
  {
    // 8
    name: 'Kwame',
    isActive: true,
    desiredWorkingHours: 10,
    note: "Doesn't teach Email Marketing.",
    contractType: { id: 3 },
    weekdaysRange: { id: 2 },
  },
  {
    // 9
    name: 'Mariam',
    isActive: true,
    desiredWorkingHours: null,
    note: '',
    contractType: { id: 1 },
    weekdaysRange: { id: 1 },
  },
  {
    // 10
    name: 'Rafael',
    isActive: true,
    desiredWorkingHours: 40,
    note: '',
    contractType: { id: 3 },
    weekdaysRange: { id: 1 },
  },
  {
    // 11
    name: 'Rodrigo',
    isActive: true,
    desiredWorkingHours: 20,
    note: '',
    contractType: { id: 3 },
    weekdaysRange: { id: 1 },
  },
  {
    // 12
    name: 'Vedant',
    isActive: true,
    desiredWorkingHours: null,
    note: '',
    contractType: { id: 2 },
    weekdaysRange: { id: 1 },
  },
  {
    // 13
    name: 'Amir',
    isActive: false,
    desiredWorkingHours: 10,
    note: '',
    contractType: { id: 3 },
    weekdaysRange: { id: 1 },
  },
  {
    // 14
    name: 'Andres Franco',
    isActive: false,
    desiredWorkingHours: 40,
    note: '',
    contractType: { id: 3 },
    weekdaysRange: { id: 1 },
  },
  {
    // 15
    name: 'Aswini',
    isActive: false,
    desiredWorkingHours: 10,
    note: '',
    contractType: { id: 3 },
    weekdaysRange: { id: 1 },
  },
  {
    // 16
    name: 'Brigitte',
    isActive: false,
    desiredWorkingHours: 30,
    note: '',
    contractType: { id: 3 },
    weekdaysRange: { id: 1 },
  },
  {
    // 17
    name: 'Cody',
    isActive: false,
    desiredWorkingHours: 10,
    note: '',
    contractType: { id: 3 },
    weekdaysRange: { id: 2 },
  },
  {
    // 18
    name: 'Daria Astanaeva',
    isActive: false,
    desiredWorkingHours: 10,
    note: '',
    contractType: { id: 3 },
    weekdaysRange: { id: 1 },
  },
  {
    // 19
    name: 'Elmira',
    isActive: false,
    desiredWorkingHours: 30,
    note: '',
    contractType: { id: 3 },
    weekdaysRange: { id: 1 },
  },
  {
    // 20
    name: 'Jasleen',
    isActive: false,
    desiredWorkingHours: 10,
    note: '',
    contractType: { id: 3 },
    weekdaysRange: { id: 1 },
  },
  {
    // 21
    name: 'Rafaela',
    isActive: false,
    desiredWorkingHours: 10,
    note: '',
    contractType: { id: 3 },
    weekdaysRange: { id: 2 },
  },
  {
    // 22
    name: 'Tiago',
    isActive: false,
    desiredWorkingHours: null,
    note: '',
    contractType: { id: 1 },
    weekdaysRange: { id: 1 },
  },
  {
    // 23
    name: 'Mariana',
    isActive: true,
    desiredWorkingHours: 20,
    note: '',
    contractType: { id: 3 },
    weekdaysRange: { id: 1 },
  },
  {
    // 24
    name: 'Nathalia',
    isActive: true,
    desiredWorkingHours: 20,
    note: '',
    contractType: { id: 3 },
    weekdaysRange: { id: 1 },
  },
].map((instructor, i) => {
  return { id: i + 1, ...instructor };
});
export const instructorSeeder = async () => {
  await seederWrapper('instructors', async () => {
    const instructorRepo = dataSource.getRepository(Instructor);
    await instructorRepo.save(instructors);
  });
};
