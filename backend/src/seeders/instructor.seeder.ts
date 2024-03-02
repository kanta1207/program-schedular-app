import dataSource from '../data-source';
import { Instructor } from '../entity/instructor.entity';
import { seederWrapper } from './utils';

const instructors = [
  {
    name: 'Ana Couto',
    isActive: true,
    desiredWorkingHours: 20,
    note: '',
    contractType: {
      id: 3,
    },
    weekdaysRange: {
      id: 1,
    },
  },
  {
    name: 'Brian',
    isActive: true,
    desiredWorkingHours: 40,
    note: '',
    contractType: {
      id: 3,
    },
    weekdaysRange: {
      id: 1,
    },
  },
  {
    name: 'Caio Franco',
    isActive: true,
    desiredWorkingHours: 20,
    note: '',
    contractType: {
      id: 3,
    },
    weekdaysRange: {
      id: 1,
    },
  },
  {
    name: 'Diogo',
    isActive: true,
    desiredWorkingHours: 20,
    note: '',
    contractType: {
      id: 2,
    },
    weekdaysRange: {
      id: 1,
    },
  },
  {
    name: 'Gaurav',
    isActive: true,
    desiredWorkingHours: 20,
    note: '',
    contractType: {
      id: 2,
    },
    weekdaysRange: {
      id: 1,
    },
  },
  {
    name: 'Iman',
    isActive: true,
    desiredWorkingHours: 10,
    note: '',
    contractType: {
      id: 3,
    },
    weekdaysRange: {
      id: 1,
    },
  },
  {
    name: 'Jana',
    isActive: true,
    desiredWorkingHours: 20,
    note: '',
    contractType: {
      id: 3,
    },
    weekdaysRange: {
      id: 1,
    },
  },
  {
    name: 'Kwame',
    isActive: true,
    desiredWorkingHours: 10,
    note: '',
    contractType: {
      id: 3,
    },
    weekdaysRange: {
      id: 2,
    },
  },
  {
    name: 'Mariam',
    isActive: true,
    desiredWorkingHours: 40,
    note: '',
    contractType: {
      id: 1,
    },
    weekdaysRange: {
      id: 1,
    },
  },
  {
    name: 'Rafael',
    isActive: true,
    desiredWorkingHours: 40,
    note: '',
    contractType: {
      id: 3,
    },
    weekdaysRange: {
      id: 1,
    },
  },
  {
    name: 'Rodrigo',
    isActive: true,
    desiredWorkingHours: 20,
    note: '',
    contractType: {
      id: 3,
    },
    weekdaysRange: {
      id: 1,
    },
  },
  {
    name: 'Vedant',
    isActive: true,
    desiredWorkingHours: 20,
    note: '',
    contractType: {
      id: 2,
    },
    weekdaysRange: {
      id: 1,
    },
  },
  {
    name: 'Amir',
    isActive: false,
    desiredWorkingHours: 10,
    note: '',
    contractType: {
      id: 3,
    },
    weekdaysRange: {
      id: 1,
    },
  },
  {
    name: 'Andres Franco',
    isActive: false,
    desiredWorkingHours: 40,
    note: '',
    contractType: {
      id: 3,
    },
    weekdaysRange: {
      id: 1,
    },
  },
  {
    name: 'Aswini',
    isActive: false,
    desiredWorkingHours: 10,
    note: '',
    contractType: {
      id: 3,
    },
    weekdaysRange: {
      id: 1,
    },
  },
  {
    name: 'Brigitte',
    isActive: false,
    desiredWorkingHours: 30,
    note: '',
    contractType: {
      id: 1,
    },
    weekdaysRange: {
      id: 1,
    },
  },
  {
    name: 'Cody',
    isActive: false,
    desiredWorkingHours: 10,
    note: '',
    contractType: {
      id: 3,
    },
    weekdaysRange: {
      id: 2,
    },
  },
  {
    name: 'Daria Astanaeva',
    isActive: false,
    desiredWorkingHours: 10,
    note: '',
    contractType: {
      id: 3,
    },
    weekdaysRange: {
      id: 3,
    },
  },
  {
    name: 'Elmira',
    isActive: false,
    desiredWorkingHours: 30,
    note: '',
    contractType: {
      id: 3,
    },
    weekdaysRange: {
      id: 3,
    },
  },
  {
    name: 'Jasleen',
    isActive: false,
    desiredWorkingHours: 10,
    note: '',
    contractType: {
      id: 3,
    },
    weekdaysRange: {
      id: 1,
    },
  },
  {
    name: 'Rafaela',
    isActive: false,
    desiredWorkingHours: 10,
    note: '',
    contractType: {
      id: 3,
    },
    weekdaysRange: {
      id: 2,
    },
  },
  {
    name: 'Tiago',
    isActive: false,
    desiredWorkingHours: 40,
    note: '',
    contractType: {
      id: 1,
    },
    weekdaysRange: {
      id: 1,
    },
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
