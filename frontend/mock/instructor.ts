import { CONTRACT_TYPES, PERIOD_OF_DAYS, PROGRAMS, WEEKDAYS_RANGES } from '@/constants/_index';
import { Instructor } from '@/types/_index';
import { courses } from './_index';

export const instructors: Instructor[] = [
  {
    id: 1,
    name: 'Ana Couto',
    isActive: true,
    desiredWorkingHours: 20,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Contract')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Fri')!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: [
      {
        id: 1,
        name: 'Digital Marketing 1',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 5,
        name: 'Digital Marketing 2',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 6,
        name: 'Social Media',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 8,
        name: 'Campaign Management',
        requiredHours: 120,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 9,
        name: 'Advanced Digital Strategies',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
      {
        id: 15,
        name: 'Content Creation',
        requiredHours: 80,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
    ],
    note: '',
  },
  {
    id: 2,
    name: 'Brian',
    isActive: true,
    desiredWorkingHours: 40,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Contract')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Fri')!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === 'Evening'),
    courses: [
      {
        id: 1,
        name: 'Digital Marketing 1',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 5,
        name: 'Digital Marketing 2',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 7,
        name: 'SEO',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 8,
        name: 'Campaign Management',
        requiredHours: 120,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 10,
        name: 'E-commerce',
        requiredHours: 80,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
      {
        id: 12,
        name: 'Digital Ads',
        requiredHours: 80,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
      {
        id: 13,
        name: 'Advanced SEO',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
      {
        id: 14,
        name: 'Automation',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
      {
        id: 15,
        name: 'Content Creation',
        requiredHours: 80,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
    ],
    note: '',
  },
  {
    id: 3,
    note: '',
    name: 'Caio Franco',
    isActive: true,
    desiredWorkingHours: 20,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Contract')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Fri')!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === 'Evening'),
    courses: [
      {
        id: 1,
        name: 'Digital Marketing 1',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 5,
        name: 'Digital Marketing 2',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 8,
        name: 'Campaign Management',
        requiredHours: 120,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
    ],
  },
  {
    id: 4,
    note: '',
    name: 'Diogo',
    isActive: true,
    desiredWorkingHours: 20,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Part time')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Fri')!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === 'Evening'),
    courses: [
      {
        id: 2,
        name: 'WordPress',
        requiredHours: 30,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
    ],
  },
  {
    id: 5,
    note: '',
    name: 'Gaurav',
    isActive: true,
    desiredWorkingHours: 20,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Part time')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Fri')!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === 'Evening'),
    courses: [
      {
        id: 1,
        name: 'Digital Marketing 1',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 4,
        name: 'Analytics',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 5,
        name: 'Digital Marketing 2',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 6,
        name: 'Social Media',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 7,
        name: 'SEO',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 8,
        name: 'Campaign Management',
        requiredHours: 120,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
    ],
  },
  {
    id: 6,
    note: '',
    name: 'Iman',
    isActive: true,
    desiredWorkingHours: 10,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Contract')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Fri')!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === 'Evening'),
    courses: [
      {
        id: 4,
        name: 'Analytics',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 13,
        name: 'Advanced SEO',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
      {
        id: 14,
        name: 'Automation',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
    ],
  },
  {
    id: 7,
    note: '',
    name: 'Jana',
    isActive: true,
    desiredWorkingHours: 20,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Contract')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Fri')!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === 'Evening'),
    courses: [
      {
        id: 6,
        name: 'Social Media',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 8,
        name: 'Campaign Management',
        requiredHours: 120,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 15,
        name: 'Content Creation',
        requiredHours: 80,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
    ],
  },
  {
    id: 8,
    note: '',
    name: 'Kwame',
    isActive: true,
    desiredWorkingHours: 10,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Contract')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Wed')!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name !== 'Morning'),
    courses: [
      {
        id: 1,
        name: 'Digital Marketing 1',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 6,
        name: 'Social Media',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 7,
        name: 'SEO',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 8,
        name: 'Campaign Management',
        requiredHours: 120,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 9,
        name: 'Advanced Digital Strategies',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
      {
        id: 11,
        name: 'Growth Marketing',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
    ],
  },
  {
    id: 9,
    note: '',
    name: 'Mariam',
    isActive: true,
    desiredWorkingHours: 40,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Full time')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Fri')!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: [
      {
        id: 1,
        name: 'Digital Marketing 1',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 2,
        name: 'WordPress',
        requiredHours: 30,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 3,
        name: 'Design',
        requiredHours: 30,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 5,
        name: 'Digital Marketing 2',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 6,
        name: 'Social Media',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 8,
        name: 'Campaign Management',
        requiredHours: 120,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 15,
        name: 'Content Creation',
        requiredHours: 80,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
    ],
  },
  {
    id: 10,
    note: '',
    name: 'Rafael',
    isActive: true,
    desiredWorkingHours: 40,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Contract')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Fri')!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: [
      {
        id: 1,
        name: 'Digital Marketing 1',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 4,
        name: 'Analytics',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 5,
        name: 'Digital Marketing 2',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 7,
        name: 'SEO',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 8,
        name: 'Campaign Management',
        requiredHours: 120,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
    ],
  },
  {
    id: 11,
    note: '',
    name: 'Rodrigo',
    isActive: true,
    desiredWorkingHours: 20,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Contract')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Fri')!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: [
      {
        id: 1,
        name: 'Digital Marketing 1',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 2,
        name: 'WordPress',
        requiredHours: 30,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 3,
        name: 'Design',
        requiredHours: 30,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 5,
        name: 'Digital Marketing 2',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 6,
        name: 'Social Media',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 8,
        name: 'Campaign Management',
        requiredHours: 120,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
    ],
  },
  {
    id: 12,
    note: 'aaaaaaaaa',
    name: 'Vedant',
    isActive: true,
    desiredWorkingHours: 20,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Part time')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Fri')!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === 'Evening'),
    courses: [
      {
        id: 1,
        name: 'Digital Marketing 1',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 5,
        name: 'Digital Marketing 2',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 11,
        name: 'Growth Marketing',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
      {
        id: 14,
        name: 'Automation',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
    ],
  },
  {
    id: 13,
    note: '',
    name: 'Amir',
    isActive: false,
    desiredWorkingHours: 10,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Contract')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Fri')!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === 'Evening'),
    courses: [
      {
        id: 7,
        name: 'SEO',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 13,
        name: 'Advanced SEO',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
    ],
  },
  {
    id: 14,
    note: '',
    name: 'Andres Franco',
    isActive: false,
    desiredWorkingHours: 40,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Contract')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Fri')!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: [
      {
        id: 1,
        name: 'Digital Marketing 1',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 2,
        name: 'WordPress',
        requiredHours: 30,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 3,
        name: 'Design',
        requiredHours: 30,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 4,
        name: 'Analytics',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 5,
        name: 'Digital Marketing 2',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 6,
        name: 'Social Media',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 7,
        name: 'SEO',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 8,
        name: 'Campaign Management',
        requiredHours: 120,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 12,
        name: 'Digital Ads',
        requiredHours: 80,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
      {
        id: 14,
        name: 'Automation',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
      {
        id: 15,
        name: 'Content Creation',
        requiredHours: 80,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
    ],
  },
  {
    id: 15,
    note: '',
    name: 'Aswini',
    isActive: false,
    desiredWorkingHours: 10,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Contract')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Fri')!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: [
      {
        id: 3,
        name: 'Design',
        requiredHours: 30,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
    ],
  },
  {
    id: 16,
    note: '',
    name: 'Brigitte',
    isActive: false,
    desiredWorkingHours: 30,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Full time')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Fri')!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: [
      {
        id: 1,
        name: 'Digital Marketing 1',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 5,
        name: 'Digital Marketing 2',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 6,
        name: 'Social Media',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 8,
        name: 'Campaign Management',
        requiredHours: 120,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
    ],
  },
  {
    id: 17,
    note: '',
    name: 'Cody',
    isActive: false,
    desiredWorkingHours: 10,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Contract')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Wed')!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: [
      {
        id: 1,
        name: 'Digital Marketing 1',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 4,
        name: 'Analytics',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 5,
        name: 'Digital Marketing 2',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 6,
        name: 'Social Media',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 8,
        name: 'Campaign Management',
        requiredHours: 120,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
    ],
  },
  {
    id: 18,
    note: '',
    name: 'Daria Astanaeva',
    isActive: false,
    desiredWorkingHours: 10,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Contract')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Wed - Fri')!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: [
      {
        id: 1,
        name: 'Digital Marketing 1',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 5,
        name: 'Digital Marketing 2',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 6,
        name: 'Social Media',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 8,
        name: 'Campaign Management',
        requiredHours: 120,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 15,
        name: 'Content Creation',
        requiredHours: 80,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
    ],
  },
  {
    id: 19,
    note: '',
    name: 'Elmira',
    isActive: false,
    desiredWorkingHours: 30,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Contract')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Wed - Fri')!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: [
      {
        id: 2,
        name: 'WordPress',
        requiredHours: 30,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 4,
        name: 'Analytics',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
    ],
  },
  {
    id: 20,
    note: '',
    name: 'Jasleen',
    isActive: false,
    desiredWorkingHours: 10,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Contract')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Fri')!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === 'Morning'),
    courses: [
      {
        id: 2,
        name: 'WordPress',
        requiredHours: 30,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 3,
        name: 'Design',
        requiredHours: 30,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
    ],
  },
  {
    id: 21,
    note: '',
    name: 'Rafaela',
    isActive: false,
    desiredWorkingHours: 10,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Contract')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Wed')!,
    periodOfDays: PERIOD_OF_DAYS.filter(({ name }) => name === 'Evening'),
    courses: [
      {
        id: 1,
        name: 'Digital Marketing 1',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 5,
        name: 'Digital Marketing 2',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 6,
        name: 'Social Media',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 8,
        name: 'Campaign Management',
        requiredHours: 120,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 9,
        name: 'Advanced Digital Strategies',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
      {
        id: 11,
        name: 'Growth Marketing',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMA')!,
      },
    ],
  },
  {
    id: 22,
    note: '',
    name: 'Tiago',
    isActive: false,
    desiredWorkingHours: 40,
    contractType: CONTRACT_TYPES.find(({ name }) => name === 'Full time')!,
    weekdaysRange: WEEKDAYS_RANGES.find(({ name }) => name === 'Mon - Fri')!,
    periodOfDays: PERIOD_OF_DAYS,
    courses: [
      {
        id: 1,
        name: 'Digital Marketing 1',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 5,
        name: 'Digital Marketing 2',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 6,
        name: 'Social Media',
        requiredHours: 60,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
      {
        id: 8,
        name: 'Campaign Management',
        requiredHours: 120,
        program: PROGRAMS.find(({ name }) => name === 'DMS')!,
      },
    ],
  },
];
