import { Class, MasterWeekdaysRange } from 'src/entity';
import { getOverlapsFromClasses } from './get-overlaps-from-classes.util';
import {
  MON_FRI_WEEKDAYS_RANGE_ID,
  MON_WED_WEEKDAYS_RANGE_ID,
} from '../../constants/master.constant';

describe('getOverlapsFromClasses', () => {
  const monFriWeekdaysRange = {
    id: MON_FRI_WEEKDAYS_RANGE_ID,
  } as MasterWeekdaysRange;

  const monWedWeekdaysRange = {
    id: MON_WED_WEEKDAYS_RANGE_ID,
  } as MasterWeekdaysRange;

  const class1 = {
    weekdaysRange: monFriWeekdaysRange,
    startAt: new Date('2022-03-01'),
    endAt: new Date('2022-03-31'),
  } as Class;

  const class2 = {
    weekdaysRange: monWedWeekdaysRange,
    startAt: new Date('2022-03-01'),
    endAt: new Date('2022-03-15'),
  } as Class;

  it('should return the correct overlaps', () => {
    /**
     * Case A: class1 and class2 overlap from 2022-03-01 to 2022-03-15,
     * with a total of 30 weekly hours (class1: 20 + class2: 10)
     */
    const classesCaseA = [class1, class2];

    const overlaps = getOverlapsFromClasses(classesCaseA);

    expect(overlaps).toEqual([
      {
        overlapStartAt: new Date('2022-03-01'),
        overlapEndAt: new Date('2022-03-15'),
        totalWeeklyHours: 30,
      },
    ]);
  });
});
