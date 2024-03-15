import dataSource from '../data-source';
import { Class } from '../entity';
import { seederWrapper } from './utils';

const classes = [
  /*=============================
  / DMS
  /=============================*/
  // M-1023
  {
    cohort: { id: 1 },
    startAt: new Date('2023-09-25T08:00:00.000Z'),
    endAt: new Date('2023-10-13T08:00:00.000Z'),
    course: { id: 1 },
    classroom: { id: 5 },
    weekdaysRange: { id: 1 },
    instructor: { id: 9 },
  },
  {
    cohort: { id: 1 },
    startAt: new Date('2023-10-16T08:00:00.000Z'),
    endAt: new Date('2023-11-03T08:00:00.000Z'),
    course: { id: 5 },
    classroom: { id: 5 },
    weekdaysRange: { id: 1 },
    instructor: { id: 9 },
  },
  {
    cohort: { id: 1 },
    startAt: new Date('2023-11-06T08:00:00.000Z'),
    endAt: new Date('2023-11-24T08:00:00.000Z'),
    course: { id: 2 },
    classroom: { id: 5 },
    weekdaysRange: { id: 2 },
    instructor: { id: 9 },
  },
  {
    cohort: { id: 1 },
    startAt: new Date('2023-11-06T08:00:00.000Z'),
    endAt: new Date('2023-11-24T08:00:00.000Z'),
    course: { id: 3 },
    classroom: { id: 5 },
    weekdaysRange: { id: 3 },
    instructor: { id: 9 },
  },
  {
    cohort: { id: 1 },
    startAt: new Date('2023-11-27T08:00:00.000Z'),
    endAt: new Date('2023-12-15T08:00:00.000Z'),
    course: { id: 7 },
    classroom: { id: 5 },
    weekdaysRange: { id: 1 },
    instructor: { id: 2 },
  },
  {
    cohort: { id: 1 },
    startAt: new Date('2024-01-02T08:00:00.000Z'),
    endAt: new Date('2024-01-19T08:00:00.000Z'),
    course: { id: 4 },
    classroom: { id: 5 },
    weekdaysRange: { id: 1 },
    instructor: { id: 2 },
  },
  {
    cohort: { id: 1 },
    startAt: new Date('2024-01-22T08:00:00.000Z'),
    endAt: new Date('2024-02-09T08:00:00.000Z'),
    course: { id: 6 },
    classroom: { id: 5 },
    weekdaysRange: { id: 1 },
    instructor: { id: 11 },
  },
  {
    cohort: { id: 1 },
    startAt: new Date('2024-02-12T08:00:00.000Z'),
    endAt: new Date('2024-03-22T08:00:00.000Z'),
    course: { id: 8 },
    classroom: { id: 5 },
    weekdaysRange: { id: 1 },
    instructor: { id: 11 },
  },
  // A-1023
  {
    cohort: { id: 2 },
    startAt: new Date('2023-09-25T08:00:00.000Z'),
    endAt: new Date('2023-11-03T08:00:00.000Z'),
    course: { id: 1 },
    classroom: { id: 2 },
    weekdaysRange: { id: 3 },
    instructor: { id: 2 },
  },
  {
    cohort: { id: 2 },
    startAt: new Date('2023-09-25T08:00:00.000Z'),
    endAt: new Date('2023-11-03T08:00:00.000Z'),
    course: { id: 2 },
    classroom: { id: 2 },
    weekdaysRange: { id: 2 },
    instructor: { id: 10 },
  },
  {
    cohort: { id: 2 },
    startAt: new Date('2023-10-16T08:00:00.000Z'),
    endAt: new Date('2023-11-03T08:00:00.000Z'),
    course: { id: 3 },
    classroom: { id: 2 },
    weekdaysRange: { id: 2 },
    instructor: { id: 9 },
  },
  {
    cohort: { id: 2 },
    startAt: new Date('2023-11-06T08:00:00.000Z'),
    endAt: new Date('2023-11-24T08:00:00.000Z'),
    course: { id: 5 },
    classroom: { id: 2 },
    weekdaysRange: { id: 1 },
    instructor: { id: 10 },
  },
  {
    cohort: { id: 2 },
    startAt: new Date('2023-11-27T08:00:00.000Z'),
    endAt: new Date('2023-12-15T08:00:00.000Z'),
    course: { id: 7 },
    classroom: { id: 2 },
    weekdaysRange: { id: 1 },
    instructor: { id: 10 },
  },
  {
    cohort: { id: 2 },
    startAt: new Date('2024-01-02T08:00:00.000Z'),
    endAt: new Date('2024-02-09T08:00:00.000Z'),
    course: { id: 6 },
    classroom: { id: 2 },
    weekdaysRange: { id: 2 },
    instructor: { id: 2 },
  },
  {
    cohort: { id: 2 },
    startAt: new Date('2024-01-02T08:00:00.000Z'),
    endAt: new Date('2024-02-09T08:00:00.000Z'),
    course: { id: 4 },
    classroom: { id: 2 },
    weekdaysRange: { id: 3 },
    instructor: { id: 2 },
  },
  {
    cohort: { id: 2 },
    startAt: new Date('2024-02-12T08:00:00.000Z'),
    endAt: new Date('2024-03-22T08:00:00.000Z'),
    course: { id: 8 },
    classroom: { id: 2 },
    weekdaysRange: { id: 1 },
    instructor: { id: 10 },
  },
  // E1-1023
  {
    cohort: { id: 3 },
    startAt: new Date('2023-09-25T08:00:00.000Z'),
    endAt: new Date('2023-11-03T08:00:00.000Z'),
    course: { id: 1 },
    classroom: { id: 2 },
    weekdaysRange: { id: 3 },
    instructor: { id: 3 },
  },
  {
    cohort: { id: 3 },
    startAt: new Date('2023-09-25T08:00:00.000Z'),
    endAt: new Date('2023-10-13T08:00:00.000Z'),
    course: { id: 3 },
    classroom: { id: 2 },
    weekdaysRange: { id: 2 },
    instructor: { id: 15 },
  },
  {
    cohort: { id: 3 },
    startAt: new Date('2023-10-16T08:00:00.000Z'),
    endAt: new Date('2023-11-03T08:00:00.000Z'),
    course: { id: 2 },
    classroom: { id: 2 },
    weekdaysRange: { id: 2 },
    instructor: { id: 10 },
  },
  {
    cohort: { id: 3 },
    startAt: new Date('2023-11-06T08:00:00.000Z'),
    endAt: new Date('2023-12-15T08:00:00.000Z'),
    course: { id: 5 },
    classroom: { id: 2 },
    weekdaysRange: { id: 2 },
    instructor: { id: 7 },
  },
  {
    cohort: { id: 3 },
    startAt: new Date('2023-11-06T08:00:00.000Z'),
    endAt: new Date('2023-12-15T08:00:00.000Z'),
    course: { id: 7 },
    classroom: { id: 2 },
    weekdaysRange: { id: 3 },
    instructor: { id: 10 },
  },
  {
    cohort: { id: 3 },
    startAt: new Date('2024-01-02T08:00:00.000Z'),
    endAt: new Date('2024-02-09T08:00:00.000Z'),
    course: { id: 6 },
    classroom: { id: 2 },
    weekdaysRange: { id: 2 },
    instructor: { id: 16 },
  },
  {
    cohort: { id: 3 },
    startAt: new Date('2024-01-02T08:00:00.000Z'),
    endAt: new Date('2024-02-09T08:00:00.000Z'),
    course: { id: 4 },
    classroom: { id: 2 },
    weekdaysRange: { id: 3 },
    instructor: { id: 5 },
  },
  {
    cohort: { id: 3 },
    startAt: new Date('2024-02-12T08:00:00.000Z'),
    endAt: new Date('2024-03-22T08:00:00.000Z'),
    course: { id: 8 },
    classroom: { id: 2 },
    weekdaysRange: { id: 1 },
    instructor: { id: 10 },
  },
  // E2-1023
  {
    cohort: { id: 4 },
    startAt: new Date('2023-09-25T08:00:00.000Z'),
    endAt: new Date('2023-11-03T08:00:00.000Z'),
    course: { id: 1 },
    classroom: { id: 5 },
    weekdaysRange: { id: 3 },
    instructor: { id: 7 },
  },
  {
    cohort: { id: 4 },
    startAt: new Date('2023-09-25T08:00:00.000Z'),
    endAt: new Date('2023-10-13T08:00:00.000Z'),
    course: { id: 2 },
    classroom: { id: 5 },
    weekdaysRange: { id: 2 },
    instructor: { id: 10 },
  },
  {
    cohort: { id: 4 },
    startAt: new Date('2023-10-16T08:00:00.000Z'),
    endAt: new Date('2023-11-03T08:00:00.000Z'),
    course: { id: 3 },
    classroom: { id: 5 },
    weekdaysRange: { id: 2 },
    instructor: { id: 9 },
  },
  {
    cohort: { id: 4 },
    startAt: new Date('2023-11-06T08:00:00.000Z'),
    endAt: new Date('2023-12-15T08:00:00.000Z'),
    course: { id: 7 },
    classroom: { id: 5 },
    weekdaysRange: { id: 2 },
    instructor: { id: 10 },
  },
  {
    cohort: { id: 4 },
    startAt: new Date('2023-11-06T08:00:00.000Z'),
    endAt: new Date('2023-12-15T08:00:00.000Z'),
    course: { id: 5 },
    classroom: { id: 5 },
    weekdaysRange: { id: 3 },
    instructor: { id: 9 },
  },
  {
    cohort: { id: 4 },
    startAt: new Date('2024-01-02T08:00:00.000Z'),
    endAt: new Date('2024-02-09T08:00:00.000Z'),
    course: { id: 4 },
    classroom: { id: 5 },
    weekdaysRange: { id: 2 },
    instructor: { id: 5 },
  },
  {
    cohort: { id: 4 },
    startAt: new Date('2024-01-02T08:00:00.000Z'),
    endAt: new Date('2024-02-09T08:00:00.000Z'),
    course: { id: 6 },
    classroom: { id: 5 },
    weekdaysRange: { id: 3 },
    instructor: { id: 7 },
  },
  {
    cohort: { id: 4 },
    startAt: new Date('2024-02-12T08:00:00.000Z'),
    endAt: new Date('2024-03-22T08:00:00.000Z'),
    course: { id: 8 },
    classroom: { id: 5 },
    weekdaysRange: { id: 1 },
    instructor: { id: 7 },
  },
  //// DMS-2024-Jan
  // A1-0124
  {
    cohort: { id: 5 },
    startAt: new Date('2024-01-02T08:00:00.000Z'),
    endAt: new Date('2024-02-09T08:00:00.000Z'),
    course: { id: 1 },
    classroom: { id: 5 },
    weekdaysRange: { id: 3 },
    instructor: { id: 16 },
  },
  {
    cohort: { id: 5 },
    startAt: new Date('2024-01-02T08:00:00.000Z'),
    endAt: new Date('2024-01-19T08:00:00.000Z'),
    course: { id: 2 },
    classroom: { id: 5 },
    weekdaysRange: { id: 2 },
    instructor: { id: 9 },
  },
  {
    cohort: { id: 5 },
    startAt: new Date('2024-01-22T08:00:00.000Z'),
    endAt: new Date('2024-02-09T08:00:00.000Z'),
    course: { id: 3 },
    classroom: { id: 5 },
    weekdaysRange: { id: 2 },
    instructor: { id: 9 },
  },
  {
    cohort: { id: 5 },
    startAt: new Date('2024-02-12T08:00:00.000Z'),
    endAt: new Date('2024-03-22T08:00:00.000Z'),
    course: { id: 5 },
    classroom: { id: 5 },
    weekdaysRange: { id: 2 },
    instructor: { id: 9 },
  },
  {
    cohort: { id: 5 },
    startAt: new Date('2024-02-12T08:00:00.000Z'),
    endAt: new Date('2024-03-22T08:00:00.000Z'),
    course: { id: 7 },
    classroom: { id: 5 },
    weekdaysRange: { id: 3 },
    instructor: { id: 2 },
  },
  {
    cohort: { id: 5 },
    startAt: new Date('2024-04-02T08:00:00.000Z'),
    endAt: new Date('2024-05-10T08:00:00.000Z'),
    course: { id: 6 },
    classroom: { id: 5 },
    weekdaysRange: { id: 2 },
    instructor: { id: 11 },
  },
  {
    cohort: { id: 5 },
    startAt: new Date('2024-04-02T08:00:00.000Z'),
    endAt: new Date('2024-05-10T08:00:00.000Z'),
    course: { id: 4 },
    classroom: { id: 5 },
    weekdaysRange: { id: 3 },
    instructor: { id: 10 },
  },
  {
    cohort: { id: 5 },
    startAt: new Date('2024-05-13T08:00:00.000Z'),
    endAt: new Date('2024-06-21T08:00:00.000Z'),
    course: { id: 8 },
    classroom: { id: 5 },
    weekdaysRange: { id: 1 },
    instructor: { id: 10 },
  },
  // E1-0124
  {
    cohort: { id: 6 },
    startAt: new Date('2024-01-02T08:00:00.000Z'),
    endAt: new Date('2024-01-19T08:00:00.000Z'),
    course: { id: 2 },
    classroom: { id: 4 },
    weekdaysRange: { id: 2 },
    instructor: { id: 4 },
  },
  {
    cohort: { id: 6 },
    startAt: new Date('2024-01-02T08:00:00.000Z'),
    endAt: new Date('2024-01-19T08:00:00.000Z'),
    course: { id: 1 },
    classroom: { id: 4 },
    weekdaysRange: { id: 3 },
    instructor: { id: 3 },
  },
  {
    cohort: { id: 6 },
    startAt: new Date('2024-01-22T08:00:00.000Z'),
    endAt: new Date('2024-02-09T08:00:00.000Z'),
    course: { id: 1 },
    classroom: { id: 4 },
    weekdaysRange: { id: 2 },
    instructor: { id: 3 },
  },
  {
    cohort: { id: 6 },
    startAt: new Date('2024-01-22T08:00:00.000Z'),
    endAt: new Date('2024-02-09T08:00:00.000Z'),
    course: { id: 3 },
    classroom: { id: 4 },
    weekdaysRange: { id: 3 },
    instructor: { id: 9 },
  },
  {
    cohort: { id: 6 },
    startAt: new Date('2024-02-12T08:00:00.000Z'),
    endAt: new Date('2024-03-22T08:00:00.000Z'),
    course: { id: 7 },
    classroom: { id: 4 },
    weekdaysRange: { id: 2 },
    instructor: { id: 5 },
  },
  {
    cohort: { id: 6 },
    startAt: new Date('2024-02-12T08:00:00.000Z'),
    endAt: new Date('2024-03-22T08:00:00.000Z'),
    course: { id: 5 },
    classroom: { id: 4 },
    weekdaysRange: { id: 3 },
    instructor: { id: 9 },
  },
  {
    cohort: { id: 6 },
    startAt: new Date('2024-04-02T08:00:00.000Z'),
    endAt: new Date('2024-05-10T08:00:00.000Z'),
    course: { id: 4 },
    classroom: { id: 4 },
    weekdaysRange: { id: 2 },
    instructor: { id: 3 }, // Nathalia was not in the list
  },
  {
    cohort: { id: 6 },
    startAt: new Date('2024-04-02T08:00:00.000Z'),
    endAt: new Date('2024-05-10T08:00:00.000Z'),
    course: { id: 6 },
    classroom: { id: 4 },
    weekdaysRange: { id: 3 },
    instructor: { id: 5 },
  },
  {
    cohort: { id: 6 },
    startAt: new Date('2024-05-13T08:00:00.000Z'),
    endAt: new Date('2024-06-21T08:00:00.000Z'),
    course: { id: 8 },
    classroom: { id: 4 },
    weekdaysRange: { id: 1 },
    instructor: { id: 10 },
  },
  // E2-0124
  {
    cohort: { id: 7 },
    startAt: new Date('2024-01-02T08:00:00.000Z'),
    endAt: new Date('2024-01-19T08:00:00.000Z'),
    course: { id: 3 },
    classroom: { id: 7 },
    weekdaysRange: { id: 3 },
    instructor: { id: 9 },
  },
  {
    cohort: { id: 7 },
    startAt: new Date('2024-01-02T08:00:00.000Z'),
    endAt: new Date('2024-01-19T08:00:00.000Z'),
    course: { id: 1 },
    classroom: { id: 7 },
    weekdaysRange: { id: 2 },
    instructor: { id: 3 },
  },
  {
    cohort: { id: 7 },
    startAt: new Date('2024-01-22T08:00:00.000Z'),
    endAt: new Date('2024-02-09T08:00:00.000Z'),
    course: { id: 1 },
    classroom: { id: 7 },
    weekdaysRange: { id: 3 },
    instructor: { id: 3 },
  },
  {
    cohort: { id: 7 },
    startAt: new Date('2024-01-22T08:00:00.000Z'),
    endAt: new Date('2024-02-09T08:00:00.000Z'),
    course: { id: 2 },
    classroom: { id: 7 },
    weekdaysRange: { id: 2 },
    instructor: { id: 4 },
  },
  {
    cohort: { id: 7 },
    startAt: new Date('2024-02-12T08:00:00.000Z'),
    endAt: new Date('2024-03-22T08:00:00.000Z'),
    course: { id: 5 },
    classroom: { id: 7 },
    weekdaysRange: { id: 2 },
    instructor: { id: 3 },
  },
  {
    cohort: { id: 7 },
    startAt: new Date('2024-02-12T08:00:00.000Z'),
    endAt: new Date('2024-03-22T08:00:00.000Z'),
    course: { id: 7 },
    classroom: { id: 7 },
    weekdaysRange: { id: 3 },
    instructor: { id: 5 },
  },
  {
    cohort: { id: 7 },
    startAt: new Date('2024-04-02T08:00:00.000Z'),
    endAt: new Date('2024-05-10T08:00:00.000Z'),
    course: { id: 6 },
    classroom: { id: 7 },
    weekdaysRange: { id: 2 },
    instructor: { id: 5 },
  },
  {
    cohort: { id: 7 },
    startAt: new Date('2024-04-02T08:00:00.000Z'),
    endAt: new Date('2024-05-10T08:00:00.000Z'),
    course: { id: 4 },
    classroom: { id: 7 },
    weekdaysRange: { id: 3 },
    instructor: { id: 10 },
  },
  {
    cohort: { id: 7 },
    startAt: new Date('2024-05-13T08:00:00.000Z'),
    endAt: new Date('2024-06-21T08:00:00.000Z'),
    course: { id: 8 },
    classroom: { id: 7 },
    weekdaysRange: { id: 1 },
    instructor: { id: 3 }, // Nathalia was not in the list
  },
  /*=============================
  / DMA
  /=============================*/
  //// 2023-August-intake
  // E-0923
  {
    cohort: { id: 8 },
    startAt: new Date('2023-08-28T08:00:00.000Z'),
    endAt: new Date('2023-10-20T08:00:00.000Z'),
    course: { id: 10 },
    classroom: { id: 6 },
    weekdaysRange: { id: 2 },
    instructor: { id: 2 },
  },
  {
    cohort: { id: 8 },
    startAt: new Date('2023-08-28T08:00:00.000Z'),
    endAt: new Date('2023-10-20T08:00:00.000Z'),
    course: { id: 15 },
    classroom: { id: 6 },
    weekdaysRange: { id: 3 },
    instructor: { id: 9 },
  },
  {
    cohort: { id: 8 },
    startAt: new Date('2023-10-23T08:00:00.000Z'),
    endAt: new Date('2023-12-15T08:00:00.000Z'),
    course: { id: 12 },
    classroom: { id: 7 },
    weekdaysRange: { id: 2 },
    instructor: { id: 2 },
  },
  {
    cohort: { id: 8 },
    startAt: new Date('2023-10-23T08:00:00.000Z'),
    endAt: new Date('2023-12-01T08:00:00.000Z'),
    course: { id: 11 },
    classroom: { id: 7 },
    weekdaysRange: { id: 3 },
    instructor: { id: 12 },
  },
  {
    cohort: { id: 8 },
    startAt: new Date('2023-12-04T08:00:00.000Z'),
    endAt: new Date('2024-01-26T08:00:00.000Z'),
    course: { id: 9 },
    classroom: { id: 7 },
    weekdaysRange: { id: 3 },
    instructor: { id: 6 },
  },
  {
    cohort: { id: 8 },
    startAt: new Date('2024-01-02T08:00:00.000Z'),
    endAt: new Date('2024-02-09T08:00:00.000Z'),
    course: { id: 13 },
    classroom: { id: 6 },
    weekdaysRange: { id: 2 },
    instructor: { id: 2 },
  },
  {
    cohort: { id: 8 },
    startAt: new Date('2024-01-29T08:00:00.000Z'),
    endAt: new Date('2024-02-09T08:00:00.000Z'),
    course: { id: 14 },
    classroom: { id: 6 },
    weekdaysRange: { id: 3 },
    instructor: { id: 6 },
  },
  {
    cohort: { id: 8 },
    startAt: new Date('2024-02-12T08:00:00.000Z'),
    endAt: new Date('2024-02-23T08:00:00.000Z'),
    course: { id: 14 },
    classroom: { id: 6 },
    weekdaysRange: { id: 1 },
    instructor: { id: 6 },
  },
  //// 2023-November-intake
  // E-1223
  {
    cohort: { id: 9 },
    startAt: new Date('2023-11-20T08:00:00.000Z'),
    endAt: new Date('2024-01-26T08:00:00.000Z'),
    course: { id: 15 },
    classroom: { id: 8 },
    weekdaysRange: { id: 2 },
    instructor: { id: 9 },
  },
  {
    cohort: { id: 9 },
    startAt: new Date('2023-11-20T08:00:00.000Z'),
    endAt: new Date('2024-01-26T08:00:00.000Z'),
    course: { id: 10 },
    classroom: { id: 8 },
    weekdaysRange: { id: 3 },
    instructor: { id: 2 },
  },
  {
    cohort: { id: 9 },
    startAt: new Date('2024-01-29T08:00:00.000Z'),
    endAt: new Date('2024-03-08T08:00:00.000Z'),
    course: { id: 11 },
    classroom: { id: 8 },
    weekdaysRange: { id: 2 },
    instructor: { id: 8 },
  },
  {
    cohort: { id: 9 },
    startAt: new Date('2024-01-29T08:00:00.000Z'),
    endAt: new Date('2024-03-22T08:00:00.000Z'),
    course: { id: 12 },
    classroom: { id: 8 },
    weekdaysRange: { id: 3 },
    instructor: { id: 2 },
  },
  {
    cohort: { id: 9 },
    startAt: new Date('2024-03-11T08:00:00.000Z'),
    endAt: new Date('2024-04-26T08:00:00.000Z'),
    course: { id: 9 },
    classroom: { id: 8 },
    weekdaysRange: { id: 2 },
    instructor: { id: 6 },
  },
  {
    cohort: { id: 9 },
    startAt: new Date('2024-04-02T08:00:00.000Z'),
    endAt: new Date('2024-05-10T08:00:00.000Z'),
    course: { id: 13 },
    classroom: { id: 8 },
    weekdaysRange: { id: 3 },
    instructor: { id: 2 },
  },
  {
    cohort: { id: 9 },
    startAt: new Date('2024-04-29T08:00:00.000Z'),
    endAt: new Date('2024-05-10T08:00:00.000Z'),
    course: { id: 14 },
    classroom: { id: 8 },
    weekdaysRange: { id: 2 },
    instructor: { id: 12 },
  },
  {
    cohort: { id: 9 },
    startAt: new Date('2024-05-13T08:00:00.000Z'),
    endAt: new Date('2024-05-24T08:00:00.000Z'),
    course: { id: 14 },
    classroom: { id: 8 },
    weekdaysRange: { id: 1 },
    instructor: { id: 12 },
  },
  //// 2024-March-intake
  // E-0324
  {
    cohort: { id: 10 },
    startAt: new Date('2024-02-26T08:00:00.000Z'),
    endAt: new Date('2024-04-26T08:00:00.000Z'),
    course: { id: 15 },
    classroom: { id: 6 },
    weekdaysRange: { id: 2 },
    instructor: { id: 9 },
  },
  {
    cohort: { id: 10 },
    startAt: new Date('2024-02-26T08:00:00.000Z'),
    endAt: new Date('2024-04-26T08:00:00.000Z'),
    course: { id: 10 },
    classroom: { id: 6 },
    weekdaysRange: { id: 3 },
    instructor: { id: 2 },
  },
  {
    cohort: { id: 10 },
    startAt: new Date('2024-04-29T08:00:00.000Z'),
    endAt: new Date('2024-06-07T08:00:00.000Z'),
    course: { id: 9 },
    classroom: { id: 6 },
    weekdaysRange: { id: 2 },
    instructor: { id: 9 },
  },
  {
    cohort: { id: 10 },
    startAt: new Date('2024-04-29T08:00:00.000Z'),
    endAt: new Date('2024-06-21T08:00:00.000Z'),
    course: { id: 12 },
    classroom: { id: 6 },
    weekdaysRange: { id: 3 },
    instructor: { id: 2 },
  },
  {
    cohort: { id: 10 },
    startAt: new Date('2024-06-10T08:00:00.000Z'),
    endAt: new Date('2024-07-26T08:00:00.000Z'),
    course: { id: 11 },
    classroom: { id: 6 },
    weekdaysRange: { id: 2 },
    instructor: { id: 12 },
  },
  {
    cohort: { id: 10 },
    startAt: new Date('2024-07-02T08:00:00.000Z'),
    endAt: new Date('2024-08-09T08:00:00.000Z'),
    course: { id: 13 },
    classroom: { id: 6 },
    weekdaysRange: { id: 3 },
    instructor: { id: 6 },
  },
  {
    cohort: { id: 10 },
    startAt: new Date('2024-07-29T08:00:00.000Z'),
    endAt: new Date('2024-08-09T08:00:00.000Z'),
    course: { id: 14 },
    classroom: { id: 6 },
    weekdaysRange: { id: 2 },
    instructor: null,
  },
  {
    cohort: { id: 10 },
    startAt: new Date('2024-08-12T08:00:00.000Z'),
    endAt: new Date('2024-08-23T08:00:00.000Z'),
    course: { id: 14 },
    classroom: { id: 6 },
    weekdaysRange: { id: 1 },
    instructor: null,
  },
].map((clazz, i) => {
  return { id: i + 1, ...clazz };
});

export const classSeeder = async () => {
  await seederWrapper('classes', async () => {
    const classRepo = dataSource.getRepository(Class);
    await classRepo.save(classes);
  });
};
