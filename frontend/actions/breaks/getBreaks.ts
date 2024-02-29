import { breaks } from '@/mock/_index';
import { Break } from '@/types/_index';

export const getBreaks = async (): Promise<Break[]> => {
  const sortedBreaks = breaks.sort((a, b) => b.startAt.getTime() - a.startAt.getTime());
  return sortedBreaks;

  // TODO: Remove mock and fetch data from api
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/breaks`;

    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['break'] },
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
