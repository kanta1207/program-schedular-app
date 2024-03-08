import { instructors } from '@/mock/_index';
import { Instructor } from '@/types/_index';

interface CreateInstructorPayload {
  name: string;
  isActive: boolean;
  desiredWorkingHours: number;
  contractTypeId: number;
  weekdaysRangeId: number;
  periodOfDayId: number[];
  courseIds: number[];
  notes: string;
}

export const createInstructor = async (payload: CreateInstructorPayload): Promise<Instructor> => {
  const { name, isActive, desiredWorkingHours, contractTypeId, weekdaysRangeId, periodOfDayId, courseIds, notes } =
    payload;

  console.log(name, isActive, desiredWorkingHours, contractTypeId, weekdaysRangeId, periodOfDayId, courseIds, notes);
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
      courses: courseIds,
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

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`An error occurred: ${error.message}`);
  }
};
