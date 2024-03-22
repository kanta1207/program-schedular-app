import {
  MON_FRI_WEEKDAYS_RANGE_ID,
  MON_WED_WEEKDAYS_RANGE_ID,
  WED_FRI_WEEKDAYS_RANGE_ID,
} from '../../constants/master.constant';
import { getWeeklyHours } from './get-weekly-hours';

describe('getWeeklyHours', () => {
  it('should return 20 for Monday-Friday range', () => {
    const result = getWeeklyHours(MON_FRI_WEEKDAYS_RANGE_ID);
    expect(result).toBe(20);
  });

  it('should return 10 for Monday-Wednesday range', () => {
    const result = getWeeklyHours(MON_WED_WEEKDAYS_RANGE_ID);
    expect(result).toBe(10);
  });

  it('should return 10 for Wednesday-Friday range', () => {
    const result = getWeeklyHours(WED_FRI_WEEKDAYS_RANGE_ID);
    expect(result).toBe(10);
  });

  it('should throw an error for invalid range', () => {
    expect(() => getWeeklyHours(999)).toThrow('Invalid weekdays range ID');
  });
});
