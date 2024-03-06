import { revalidateTag } from 'next/cache';
import { instructors } from '@/mock/_index';
import { Instructor, PeriodOfDayName } from '@/types/_index';

interface CreateInstructorPayload {
  name: string;
  isActive: boolean;
  desiredWorkingHours: number;
  contractTypeId: number;
  weekdaysRangeId: number;
  periodOfDayId: PeriodOfDayName[];
  coursesIds: number[];
  notes: string;
}

export const createInstructor = async (payload: CreateInstructorPayload): Promise<Instructor> => {
  const { name, isActive, desiredWorkingHours, contractTypeId, weekdaysRangeId, periodOfDayId, coursesIds, notes } =
    payload;

  console.log(name, isActive, desiredWorkingHours, contractTypeId, weekdaysRangeId, periodOfDayId, coursesIds, notes);
  return instructors[0];

  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/instructors`;

    const payload = {
      name: name,
      contractType: contractTypeId,
      desiredWorkingHours: desiredWorkingHours,
      weekdaysRange: weekdaysRangeId,
      periodOfDay: periodOfDayId,
      isActive: isActive,
      courses: coursesIds,
      notes: notes,
    };

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    revalidateTag('instructors');

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`An error occurred: ${error.message}`);
  }
};
