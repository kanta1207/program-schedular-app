import dataSource from '../data-source';

/**
 * Truncate table
 * * Database connection need to be established before using this function
 *
 * @param {string} tableName
 * @param {boolean} [cascade=false]
 */
export const truncateTable = async (tableName: string, cascade = false) => {
  const queryRunner = dataSource.createQueryRunner();

  const truncateQuery = `TRUNCATE TABLE ${tableName}${cascade ? ' RESTART IDENTITY CASCADE' : ''};`;

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await queryRunner.query(truncateQuery);
    await queryRunner.commitTransaction();
    console.log(`${tableName} table truncated successfully.`);
  } catch (err) {
    console.error(`Error truncating ${tableName} table: `, err);
    await queryRunner.rollbackTransaction();
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
