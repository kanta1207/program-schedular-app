import { intakes } from '@/mock/_index';
import { Intake } from '@/types/_index';

export const getIntakes = async (): Promise<Intake[]> => {
  const sortedIntakes = intakes.sort((a, b) => b.startAt.getTime() - a.startAt.getTime());
  return sortedIntakes;

  // TODO: Remove mock and fetch data from api
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/breaks`;

    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['intake'] },
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
