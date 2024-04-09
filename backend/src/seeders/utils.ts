import dataSource from '../data-source';

/**
 * Truncate table
 * * Database connection need to be established before using this function
 *
 * @param {string} tableName
 * @param {boolean} [cascade=true]
 */
export const truncateTable = async (tableName: string, cascade = true) => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  const truncateQuery = `TRUNCATE TABLE ${tableName}${cascade ? ' RESTART IDENTITY CASCADE' : ''};`;

  try {
    await queryRunner.query(truncateQuery);
    console.log(`${tableName} table truncated successfully`);
  } catch (err) {
    console.error(`Error truncating ${tableName} table: `, err);
  } finally {
    await queryRunner.release();
  }
};

/**
 *
 *
 * @param {string} tableName name of the table to truncate and seed
 * @param {() => void} func seeding function
 */
export const seederWrapper = async (tableName: string, func: () => void) => {
  await truncateTable(tableName);
  await func();
  console.log(`${tableName} seeds inserted`);
};
