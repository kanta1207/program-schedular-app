import { Class, MasterWeekdaysRange } from '../../../entity';
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

  it('should return the correct overlaps, CaseA : When new class overlap with existing class, but not overlap with existing overlap', () => {
    /**
     * Case A
     * class1(existing) and class2(existing) overlap from 2022-03-01 to 2022-03-15,
     * with a total of 30 weekly hours (class1: 20 + class2: 10)
     * class1 and class3(new class) overlap from 2022-03-16 to 2022-03-31,
     * with a total of 40 weekly hours (class1: 20 + class3: 20)
     */
    const class1 = {
      weekdaysRange: monFriWeekdaysRange,
      startAt: new Date('2022-02-28'),
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
      endAt: new Date('2022-04-07'),
    } as Class;

    const classes = [class1, class2, class3];

    const overlaps = getOverlapsFromClasses(classes);

    overlaps.sort((a, b) => a.startAt.getTime() - b.startAt.getTime());

    expect(overlaps).toEqual([
      {
        startAt: new Date('2022-03-01'),
        endAt: new Date('2022-03-15'),
        totalWeeklyHours: 30,
      },
      {
        startAt: new Date('2022-03-16'),
        endAt: new Date('2022-03-31'),
        totalWeeklyHours: 40,
      },
    ]);
  });

  it('should return the correct overlaps, CaseB: When new class is completely covered by existing overlap', () => {
    /**
     * Case B
     * class1(existing), class2(existing), and class3(new class) overlap from 2022-03-14 to 2022-03-21,
     * with a total of 50 weekly hours (class1: 20 + class2: 10 + class3: 20).
     * class1 and class2 overlap from (2022-03-07 to 2022-03-13) and (2022-03-22 to 2022-03-31),
     * without overlapping with class3
     * with a total of 30 weekly hours (class1: 20 + class2: 10)
     */
    const class1 = {
      weekdaysRange: monFriWeekdaysRange,
      startAt: new Date('2022-02-28'),
      endAt: new Date('2022-03-31'),
    } as Class;

    const class2 = {
      weekdaysRange: monWedWeekdaysRange,
      startAt: new Date('2022-03-07'),
      endAt: new Date('2022-04-07'),
    } as Class;

    const class3 = {
      weekdaysRange: monFriWeekdaysRange,
      startAt: new Date('2022-03-14'),
      endAt: new Date('2022-03-21'),
    } as Class;

    const classes = [class1, class2, class3];

    const overlaps = getOverlapsFromClasses(classes);

    overlaps.sort((a, b) => a.startAt.getTime() - b.startAt.getTime());

    expect(overlaps).toEqual([
      {
        startAt: new Date('2022-03-07'),
        endAt: new Date('2022-03-13'),
        totalWeeklyHours: 30,
      },
      {
        startAt: new Date('2022-03-14'),
        endAt: new Date('2022-03-21'),
        totalWeeklyHours: 50,
      },
      {
        startAt: new Date('2022-03-22'),
        endAt: new Date('2022-03-31'),
        totalWeeklyHours: 30,
      },
    ]);
  });

  it('should return the correct overlaps, CaseC; When new class is not completely covered by existing overlap (new class duration is longer than existing overlap)', () => {
    /**
     * Case C
     * class1(existing), class2(existing), and class3(new class) overlap from 2022-03-07 to 2022-03-31,
     * with a total of 50 weekly hours (class1: 20 + class2: 10 + class3: 20).
     * class1 and class3 overlap from (2022-02-28 to 2022-03-06)
     * without overlapping with class2
     * with a total of 40 weekly hours (class1: 20 + class3: 20)
     * class2 and class3 overlap from (2022-04-01 to 2022-04-07)
     * without overlapping with class1
     * with a total of 30 weekly hours (class2: 10 + class3: 20)
     */
    const class1 = {
      weekdaysRange: monFriWeekdaysRange,
      startAt: new Date('2022-02-28'),
      endAt: new Date('2022-03-31'),
    } as Class;

    const class2 = {
      weekdaysRange: monWedWeekdaysRange,
      startAt: new Date('2022-03-07'),
      endAt: new Date('2022-04-07'),
    } as Class;

    const class3 = {
      weekdaysRange: monFriWeekdaysRange,
      startAt: new Date('2022-02-21'),
      endAt: new Date('2022-04-14'),
    } as Class;

    const classes = [class1, class2, class3];

    const overlaps = getOverlapsFromClasses(classes);

    overlaps.sort((a, b) => a.startAt.getTime() - b.startAt.getTime());

    expect(overlaps).toEqual([
      {
        startAt: new Date('2022-02-28'),
        endAt: new Date('2022-03-06'),
        totalWeeklyHours: 40,
      },
      {
        startAt: new Date('2022-03-07'),
        endAt: new Date('2022-03-31'),
        totalWeeklyHours: 50,
      },
      {
        startAt: new Date('2022-04-01'),
        endAt: new Date('2022-04-07'),
        totalWeeklyHours: 30,
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

    const classes = [class1, class2];

    const overlaps = getOverlapsFromClasses(classes);

    expect(overlaps).toEqual([]);
  });
});
