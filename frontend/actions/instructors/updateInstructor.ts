import { instructors, courses } from '@/mock/_index';
import { Course, Instructor, PeriodOfDay } from '@/types/_index';
import { CONTRACT_TYPES, PERIOD_OF_DAYS, WEEKDAYS_RANGES } from '@/constants/_index';

interface UpdateInstructorPayload {
  name: string;
  isActive: boolean;
  desiredWorkingHours: number;
  contractTypeId: number;
  weekdaysRangeId: number;
  periodOfDayId: number[];
  courseIds: number[];
  note: string;
}

export const updateInstructor = async (id: number, payload: UpdateInstructorPayload): Promise<Instructor> => {
  const { name, isActive, desiredWorkingHours, contractTypeId, weekdaysRangeId, periodOfDayId, courseIds, note } =
    payload;

  console.log(id, isActive, desiredWorkingHours, contractTypeId, weekdaysRangeId, periodOfDayId, courseIds, note);

  const tmpInstructor = instructors.find((instructorItem) => instructorItem.id === id);
  if (!tmpInstructor) throw new Error('Instructor not found');

  tmpInstructor.name = name;
  tmpInstructor.isActive = isActive;
  tmpInstructor.desiredWorkingHours = desiredWorkingHours;
  tmpInstructor.contractType = CONTRACT_TYPES.find((type) => type.id === contractTypeId) ?? tmpInstructor.contractType;
  tmpInstructor.weekdaysRange =
    WEEKDAYS_RANGES.find((range) => range.id === weekdaysRangeId) ?? tmpInstructor.weekdaysRange;
  tmpInstructor.periodOfDays = periodOfDayId
    .map((periodId) => PERIOD_OF_DAYS.find((period) => period.id === periodId))
    .filter((period) => period !== undefined) as PeriodOfDay[];

  tmpInstructor.courses = courseIds
    .map((courseId) => courses.find((course) => course.id === courseId))
    .filter((course) => course !== undefined) as Course[];

  tmpInstructor.note = note;

  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/instructors/${id}`;
    const updatePayload = {
      name,
      isActive,
      desiredWorkingHours,
      contractType: tmpInstructor.contractType.name,
      weekdaysRange: tmpInstructor.weekdaysRange.name,
      periodOfDay: tmpInstructor.periodOfDays.map((pd) => pd.name),
      courses: tmpInstructor.courses.map((course) => course.name),
      note,
    };

    const response = await fetch(baseUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`An error occurred: ${error.message}`);
  }
};
