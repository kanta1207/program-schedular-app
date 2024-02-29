'use server';

export const deleteBreak = async (id: number): Promise<null> => {
  // Simulate a long-running operation
  console.log(`Deleting ${id}...`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(`Deleted ${id}!`);
  return null;

  // TODO: Fetch data from api
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/breaks/${id}`;

    const response = await fetch(baseUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
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
