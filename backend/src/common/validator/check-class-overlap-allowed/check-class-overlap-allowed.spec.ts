import { FormattedClass } from '../../../modules/cohorts/types';
import { checkClassOverlapAllowed } from './check-class-overlap-allowed';
import * as dayjs from 'dayjs';

describe('checkOverlapAllowed', () => {
  it('should not add error messages for non-overlapping classes', () => {
    const formattedClasses = [
      {
        startAt: dayjs('2024-03-01').toDate(),
        endAt: dayjs('2024-03-15').toDate(),
        weekdaysRange: { data: { name: 'Mon - Wed', id: 2 }, messages: [] },
      },
      {
        startAt: dayjs('2024-03-16').toDate(),
        endAt: dayjs('2024-03-31').toDate(),
        weekdaysRange: { data: { name: 'Wed - Fri', id: 3 }, messages: [] },
      },
    ] as FormattedClass[];

    const result = checkClassOverlapAllowed(formattedClasses);
    expect(result[0].weekdaysRange.messages.length).toBe(0);
    expect(result[1].weekdaysRange.messages.length).toBe(0);
  });

  it('should add error messages for overlapping classes with disallowed combinations', () => {
    const formattedClasses = [
      {
        startAt: dayjs('2024-03-01').toDate(),
        endAt: dayjs('2024-03-15').toDate(),
        weekdaysRange: { data: { name: 'Mon - Wed', id: 2 }, messages: [] },
      },
      {
        startAt: dayjs('2024-03-15').toDate(),
        endAt: dayjs('2024-03-25').toDate(),
        weekdaysRange: { data: { name: 'Mon - Wed', id: 2 }, messages: [] },
      },
    ] as FormattedClass[];

    const result = checkClassOverlapAllowed(formattedClasses);
    expect(result[0].weekdaysRange.messages.length).not.toBe(0);
    expect(result[1].weekdaysRange.messages.length).not.toBe(0);
    expect(result[0].weekdaysRange.messages[0]).toContain(
      'This course is overlapping with another course.',
    );
    expect(result[1].weekdaysRange.messages[0]).toContain(
      'This course is overlapping with another course.',
    );
  });
});
