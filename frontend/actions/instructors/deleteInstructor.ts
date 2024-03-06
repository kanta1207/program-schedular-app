export const deleteInstructor = async (id: number): Promise<null> => {
  console.log(`Deleting ${id}...`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(`Deleted ${id}!`);
  return null;

  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/instructors/${id}`;

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
