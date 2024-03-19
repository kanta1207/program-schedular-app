import { Holiday } from '@/types/_index';

export const getHolidays = async (): Promise<Holiday[] | undefined> => {
  try {
    const response = await fetch('https://canada-holidays.ca/api/v1/provinces/BC', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Something went wrong while fetching holidays: ${response.status} ${response.statusText}`);
      return undefined;
    }

    const data = await response.json();
    const holidays = data.province.holidays;
    return holidays;
  } catch (error: any) {
    console.error(error);
  }
};
