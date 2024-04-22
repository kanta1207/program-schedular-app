import dataSource from '../data-source';
import { Course } from '../entity';
import { seederWrapper } from './utils';

const courses = [
  {
    // 1
    name: 'Digital Marketing 1',
    requiredHours: 60,
    program: { id: 1 },
  },
  {
    // 2
    name: 'WordPress',
    requiredHours: 30,
    program: { id: 1 },
  },
  {
    // 3
    name: 'Design',
    requiredHours: 30,
    program: { id: 1 },
  },
  {
    // 4
    name: 'Analytics',
    requiredHours: 60,
    program: { id: 1 },
  },
  {
    // 5
    name: 'Digital Marketing 2',
    requiredHours: 60,
    program: { id: 1 },
  },
  {
    // 6
    name: 'Social Media',
    requiredHours: 60,
    program: { id: 1 },
  },
  {
    // 7
    name: 'SEO',
    requiredHours: 60,
    program: { id: 1 },
  },
  {
    // 8
    name: 'Campaign Management',
    requiredHours: 120,
    program: { id: 1 },
  },
  {
    // 9
    name: 'Advanced Digital Strategies',
    requiredHours: 60,
    program: { id: 2 },
  },
  {
    // 10
    name: 'E-commerce',
    requiredHours: 80,
    program: { id: 2 },
  },
  {
    // 11
    name: 'Growth Marketing',
    requiredHours: 60,
    program: { id: 2 },
  },
  {
    // 12
    name: 'Digital Ads',
    requiredHours: 80,
    program: { id: 2 },
  },
  {
    // 13
    name: 'Advanced SEO',
    requiredHours: 60,
    program: { id: 2 },
  },
  {
    // 14
    name: 'Automation',
    requiredHours: 60,
    program: { id: 2 },
  },
  {
    // 15
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
