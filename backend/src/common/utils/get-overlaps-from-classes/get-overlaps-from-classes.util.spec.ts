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

  it('should return the correct overlaps, CaseA: when there are two overlap groups', () => {
    /**
     * Case A
     * class1 and class2 overlap from 2022-03-01 to 2022-03-15,
     * with a total of 30 weekly hours (class1: 20 + class2: 10)
     * class1 and class3 overlap from 2022-03-16 to 2022-03-31,
     * with a total of 40 weekly hours (class1: 20 + class3: 20)
     */
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

    const class3 = {
      weekdaysRange: monFriWeekdaysRange,
      startAt: new Date('2022-03-16'),
      endAt: new Date('2022-03-31'),
    } as Class;

    const classesCaseA = [class1, class2, class3];

    const overlapsA = getOverlapsFromClasses(classesCaseA);

    expect(overlapsA).toEqual([
      {
        overlapStartAt: new Date('2022-03-01'),
        overlapEndAt: new Date('2022-03-15'),
        totalWeeklyHours: 30,
      },
      {
        overlapStartAt: new Date('2022-03-16'),
        overlapEndAt: new Date('2022-03-31'),
        totalWeeklyHours: 40,
      },
    ]);
  });

  it('should return the correct overlaps, CaseB: when there are 1 overlap group, and one of the class is not overlap with others', () => {
    /**
     * Case B
     * class1 and class2 overlap from 2022-03-01 to 2022-03-12,
     * with a total of 30 weekly hours (class1: 20 + class2: 10)
     */
    const class1 = {
      weekdaysRange: monFriWeekdaysRange,
      startAt: new Date('2022-03-01'),
      endAt: new Date('2022-03-15'),
    } as Class;

    const class2 = {
      weekdaysRange: monWedWeekdaysRange,
      startAt: new Date('2022-03-05'),
      endAt: new Date('2022-03-12'),
    } as Class;

    const class3 = {
      weekdaysRange: monFriWeekdaysRange,
      startAt: new Date('2022-03-16'),
      endAt: new Date('2022-03-31'),
    } as Class;

    const classesCaseB = [class1, class2, class3];

    const overlapsB = getOverlapsFromClasses(classesCaseB);

    expect(overlapsB).toEqual([
      {
        overlapStartAt: new Date('2022-03-05'),
        overlapEndAt: new Date('2022-03-12'),
        totalWeeklyHours: 30,
      },
    ]);
  });

  it('should return the correct overlaps, CaseC: when there are 1 overlap group, and all of the class is overlaps', () => {
    /**
     * Case C
     * class1, class2 and class3 overlap from 2022-03-01 to 2022-03-15,
     * with a total of 50 weekly hours (class1: 20 + class2: 10 + class3: 20)
     */
    const class1 = {
      weekdaysRange: monFriWeekdaysRange,
      startAt: new Date('2022-03-01'),
      endAt: new Date('2022-03-15'),
    } as Class;

    const class2 = {
      weekdaysRange: monWedWeekdaysRange,
      startAt: new Date('2022-03-01'),
      endAt: new Date('2022-03-15'),
    } as Class;

    const class3 = {
      weekdaysRange: monFriWeekdaysRange,
      startAt: new Date('2022-03-01'),
      endAt: new Date('2022-03-15'),
    } as Class;

    const classesCaseC = [class1, class2, class3];

    const overlapsC = getOverlapsFromClasses(classesCaseC);

    expect(overlapsC).toEqual([
      {
        overlapStartAt: new Date('2022-03-01'),
        overlapEndAt: new Date('2022-03-15'),
        totalWeeklyHours: 50,
      },
    ]);
  });

  it("should return an empty array if there's no overlap", () => {
    const class1 = {
      weekdaysRange: monFriWeekdaysRange,
      startAt: new Date('2022-03-01'),
      endAt: new Date('2022-03-15'),
    } as Class;

    const class2 = {
      weekdaysRange: monWedWeekdaysRange,
      startAt: new Date('2022-03-16'),
      endAt: new Date('2022-03-31'),
    } as Class;

    const classesCaseC = [class1, class2];

    const overlapsC = getOverlapsFromClasses(classesCaseC);

    expect(overlapsC).toEqual([]);
  });
});
