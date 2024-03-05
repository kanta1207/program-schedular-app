import { Dayjs } from 'dayjs';
import { revalidateTag } from 'next/cache';
import { instructors } from '@/mock/_index';
import { Course, Instructor, PeriodOfDay, PeriodOfDayName } from '@/types/_index';
import { CONTRACT_TYPES, PERIOD_OF_DAYS, WEEKDAYS_RANGES } from '@/constants/_index';

interface UpdateInstructorPayload {
  name: string;
  isActive: boolean;
  desiredWorkingHours: number;
  contractTypeName: string;
  weekdaysRangeName: string;
  periodOfDayNames: PeriodOfDayName[];
  coursesNames: string[];
  notes: string;
}

export const updateInstructor = async (id: number, payload: UpdateInstructorPayload): Promise<Instructor> => {
  const {
    name,
    isActive,
    desiredWorkingHours,
    contractTypeName,
    weekdaysRangeName,
    periodOfDayNames,
    coursesNames,
    notes,
  } = payload;

  console.log(
    id,
    isActive,
    desiredWorkingHours,
    contractTypeName,
    weekdaysRangeName,
    periodOfDayNames,
    coursesNames,
    notes,
  );

  const tmpInstructor = instructors.find((instructorItem) => instructorItem.id === id);
  if (!tmpInstructor) throw new Error('Instructor not found');

  tmpInstructor.name = name;
  tmpInstructor.isActive = isActive;
  tmpInstructor.desiredWorkingHours = desiredWorkingHours;
  tmpInstructor.contractType =
    CONTRACT_TYPES.find((type) => type.name === contractTypeName) ?? tmpInstructor.contractType;
  tmpInstructor.weekdaysRange =
    WEEKDAYS_RANGES.find((range) => range.name === weekdaysRangeName) ?? tmpInstructor.weekdaysRange;
  tmpInstructor.periodOfDays = periodOfDayNames
    .map((name) => PERIOD_OF_DAYS.find((period) => period.name === name))
    .filter((period) => period !== undefined) as PeriodOfDay[];

  // Handle courses by name
  // tmpInstructor.courses = coursesNames
  //   .map((courseName) => COURSES.find((course) => course.name === courseName))
  //   .filter((course) => course !== undefined) as Course[];

  tmpInstructor.notes = notes;

  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/instructors/${id}`;
    // const updatePayload = {
    //   name,
    //   isActive,
    //   desiredWorkingHours,
    //   contractType: tmpInstructor.contractType.name,
    //   weekdaysRange: tmpInstructor.weekdaysRange.name,
    //   periodOfDay: tmpInstructor.periodOfDays.map((pd) => pd.name),
    //   courses: tmpInstructor.courses.map((course) => course.name),
    //   notes,
    // };

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

    revalidateTag('instructor');

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`An error occurred: ${error.message}`);
  }
};
