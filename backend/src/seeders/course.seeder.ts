import dataSource from '../data-source';
import { Course } from 'src/entity';
import { seederWrapper } from './utils';

const courses = [
  {
    name: 'Digital Marketing 1',
    requiredHours: 60,
    program: { id: 1 },
  },
  {
    name: 'WordPress',
    requiredHours: 30,
    program: { id: 1 },
  },
  {
    name: 'Design',
    requiredHours: 30,
    program: { id: 1 },
  },
  {
    name: 'Analytics',
    requiredHours: 60,
    program: { id: 1 },
  },
  {
    name: 'Digital Marketing 2',
    requiredHours: 60,
    program: { id: 1 },
  },
  {
    name: 'Social Media',
    requiredHours: 60,
    program: { id: 1 },
  },
  {
    name: 'SEO',
    requiredHours: 60,
    program: { id: 1 },
  },
  {
    name: 'Campaign Management',
    requiredHours: 120,
    program: { id: 1 },
  },
  {
    name: 'Advanced Digital Strategies',
    requiredHours: 60,
    program: { id: 2 },
  },
  {
    name: 'E-commerce',
    requiredHours: 80,
    program: { id: 2 },
  },
  {
    name: 'Growth Marketing',
    requiredHours: 60,
    program: { id: 2 },
  },
  {
    name: 'Digital Ads',
    requiredHours: 80,
    program: { id: 2 },
  },
  {
    name: 'Advanced SEO',
    requiredHours: 60,
    program: { id: 2 },
  },
  {
    name: 'Automation',
    requiredHours: 60,
    program: { id: 2 },
  },
  {
    name: 'Content Creation',
    requiredHours: 80,
    program: { id: 2 },
  },
].map((course, i) => {
  return { id: i + 1, ...course };
});

export const courseSeeder = async () => {
  await seederWrapper('courses', async () => {
    const courseRepo = dataSource.getRepository(Course);
    await courseRepo.save(courses);
  });
};
