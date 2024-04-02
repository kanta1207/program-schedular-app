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
        endAt: dayjs('2024-03-15').toDate(), // このクラスの終了日
        weekdaysRange: { data: { name: 'Mon - Wed', id: 2 }, messages: [] },
      },
      {
        startAt: dayjs('2024-03-15').toDate(), // このクラスの開始日が一つ目のクラスの終了日と同じ
        endAt: dayjs('2024-03-25').toDate(),
        weekdaysRange: { data: { name: 'Mon - Wed', id: 2 }, messages: [] }, // 許可されない組み合わせ
      },
    ] as FormattedClass[];

    const result = checkClassOverlapAllowed(formattedClasses);
    expect(result[0].weekdaysRange.messages.length).not.toBe(0);
    expect(result[1].weekdaysRange.messages.length).not.toBe(0);
    expect(result[0].weekdaysRange.messages[0]).toContain('Overlaps with');
    expect(result[1].weekdaysRange.messages[0]).toContain('Overlaps with');
  });
});
