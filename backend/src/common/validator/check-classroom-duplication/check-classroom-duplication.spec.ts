import { checkClassroomDuplication } from './check-classroom-duplication';

import {
  MORNING_PERIOD_OF_DAY_ID,
  AFTERNOON_PERIOD_OF_DAY_ID,
  MON_FRI_WEEKDAYS_RANGE_ID,
  WED_FRI_WEEKDAYS_RANGE_ID,
} from '../../../common/constants/master.constant';

describe('checkClassroomDuplication with period of day consideration', () => {
  it('should NOT return an error message if it is the same class, periods overlap and period of day matches', () => {
    const errorMessage = checkClassroomDuplication(
      1,
      1,
      new Date('2023-04-01'),
      new Date('2023-04-02'),
      MON_FRI_WEEKDAYS_RANGE_ID,
      MORNING_PERIOD_OF_DAY_ID,
      1,
      1,
      new Date('2023-04-01'),
      new Date('2023-04-02'),
      MON_FRI_WEEKDAYS_RANGE_ID,
      MORNING_PERIOD_OF_DAY_ID,
    );
    expect(errorMessage).toBeUndefined();
  });

  it('should NOT return an error message if periods overlap but period of day does not match', () => {
    const errorMessage = checkClassroomDuplication(
      1,
      1,
      new Date('2023-04-01'),
      new Date('2023-04-02'),
      MON_FRI_WEEKDAYS_RANGE_ID,
      MORNING_PERIOD_OF_DAY_ID,
      2,
      1,
      new Date('2023-04-01'),
      new Date('2023-04-02'),
      MON_FRI_WEEKDAYS_RANGE_ID,
      AFTERNOON_PERIOD_OF_DAY_ID,
    );
    expect(errorMessage).toBeUndefined();
  });

  it('should return an error message if there is an overlap, period of day matches, and it is not allowed', () => {
    const errorMessage = checkClassroomDuplication(
      1,
      1,
      new Date('2023-04-01'),
      new Date('2023-04-02'),
      MON_FRI_WEEKDAYS_RANGE_ID,
      MORNING_PERIOD_OF_DAY_ID,
      2,
      1,
      new Date('2023-04-01'),
      new Date('2023-04-02'),
      WED_FRI_WEEKDAYS_RANGE_ID,
      MORNING_PERIOD_OF_DAY_ID,
    );
    expect(errorMessage).toEqual('This classroom is used for other classes');
  });
});
