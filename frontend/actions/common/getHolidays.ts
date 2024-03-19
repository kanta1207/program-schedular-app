import { Holiday } from '@/types/holiday';

export const getHolidays = async (): Promise<Holiday[]> => {
  try {
    const response = await fetch('https://canada-holidays.ca/api/v1/provinces/BC', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    const holidays = data.province.holidays;
    return holidays;
  } catch (error: any) {
    console.error(error);
    throw new Error(`An error occurred: ${error.message}`);
  }
};
