import { cohorts } from '@/mock/_index';
import { Cohort } from '@/types/_index';

export const getCohorts = async (): Promise<Cohort[]> => {
  const sortedCohorts = cohorts.sort((a, b) => b.id - a.id);
  return sortedCohorts;

  // TODO: Remove mock and fetch data from api
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/cohorts`;

    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['cohort'] },
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

export const getCohortById = async (id: string): Promise<Cohort | undefined> => {
  const foundCohort = cohorts.find((cohort) => cohort.id === parseInt(id));
  return foundCohort;

  // TODO: Remove mock and fetch data from api
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/cohorts/${id}`;

    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['cohort'] },
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
