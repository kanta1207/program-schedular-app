import { checkClassroomDuplication } from './check-classroom-duplication';

import {
  MON_FRI_WEEKDAYS_RANGE_ID,
  MON_WED_WEEKDAYS_RANGE_ID,
  WED_FRI_WEEKDAYS_RANGE_ID,
} from '../../../common/constants/master.constant';

describe('checkClassroomDuplication without mocking checkClassOverlapAllowed', () => {
  it('should not return an error message if it is the same class', () => {
    const errorMessage = checkClassroomDuplication(
      1,
      1,
      new Date('2023-04-01'),
      new Date('2023-04-02'),
      MON_FRI_WEEKDAYS_RANGE_ID,
      1,
      1,
      new Date('2023-04-01'),
      new Date('2023-04-02'),
      MON_FRI_WEEKDAYS_RANGE_ID,
    );
    expect(errorMessage).toBeUndefined();
  });

  it('should not return an error message if classrooms are different', () => {
    const errorMessage = checkClassroomDuplication(
      1,
      1,
      new Date('2023-04-01'),
      new Date('2023-04-02'),
      MON_FRI_WEEKDAYS_RANGE_ID,
      2,
      2,
      new Date('2023-04-01'),
      new Date('2023-04-02'),
      MON_FRI_WEEKDAYS_RANGE_ID,
    );
    expect(errorMessage).toBeUndefined();
  });

  it('should not return an error message if periods do not overlap', () => {
    const errorMessage = checkClassroomDuplication(
      1,
      1,
      new Date('2023-04-01'),
      new Date('2023-04-02'),
      MON_WED_WEEKDAYS_RANGE_ID,
      2,
      1,
      new Date('2023-04-03'),
      new Date('2023-04-04'),
      WED_FRI_WEEKDAYS_RANGE_ID,
    );
    expect(errorMessage).toBeUndefined();
  });

  it('should return an error message if there is an overlap and classrooms are the same', () => {
    const errorMessage = checkClassroomDuplication(
      1,
      1,
      new Date('2023-04-01'),
      new Date('2023-04-02'),
      MON_FRI_WEEKDAYS_RANGE_ID,
      2,
      1,
      new Date('2023-04-01'),
      new Date('2023-04-02'),
      WED_FRI_WEEKDAYS_RANGE_ID,
    );
    expect(errorMessage).toEqual('This classroom is used for other classes');
  });

  it('should not return an error message if there is an overlap but classrooms are different', () => {
    const errorMessage = checkClassroomDuplication(
      1,
      1,
      new Date('2023-04-01'),
      new Date('2023-04-02'),
      MON_FRI_WEEKDAYS_RANGE_ID,
      2,
      2,
      new Date('2023-04-01'),
      new Date('2023-04-02'),
      MON_FRI_WEEKDAYS_RANGE_ID,
    );
    expect(errorMessage).toBeUndefined();
  });
});
