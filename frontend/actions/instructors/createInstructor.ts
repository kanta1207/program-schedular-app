import { Dayjs } from 'dayjs';
import { revalidateTag } from 'next/cache';
import { instructors } from '@/mock/_index';
import { Instructor, PeriodOfDayName } from '@/types/_index';

interface CreateInstructorPayload {
  name: string;
  isActive: boolean;
  desiredWorkingHours: number;
  contractTypeName: string;
  weekdaysRangeName: string;
  periodOfDayNames: PeriodOfDayName[];
  coursesNames: string[];
  notes: string;
}

export const createInstructor = async (payload: CreateInstructorPayload): Promise<Instructor> => {
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
    isActive,
    desiredWorkingHours,
    contractTypeName,
    weekdaysRangeName,
    periodOfDayNames,
    coursesNames,
    notes,
  );
  return instructors[0];

  // TODO: Fetch data from api
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/instructors`;

    const payload = {
      name: name,
      isActive: isActive,
      desiredWorkingHours: desiredWorkingHours,
      contractType: contractTypeName,
      weekdaysRange: weekdaysRangeName,
      periodOfDay: periodOfDayNames,
      courses: coursesNames,
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
