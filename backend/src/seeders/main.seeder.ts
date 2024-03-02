import dataSource from '../data-source';
import { breakSeeder } from './break.seeder';
import { masterClassroomSeeder } from './masterClassroom.seeder';
import { masterContractTypeSeeder } from './masterContactType.seeder';
import { masterPeriodOfDaySeeder } from './masterPeriodOfDay.seeder';
import { masterWeekdaysRangeSeeder } from './masterWeekdaysRange.seeder';

const mainSeeder = async () => {
  await dataSource.initialize();
  console.log('Data Source has been initialized.');

  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    console.log('Start seeding...');
    await masterClassroomSeeder();
    await masterContractTypeSeeder();
    await masterPeriodOfDaySeeder();
    await masterWeekdaysRangeSeeder();
    if (process.env.NODE_ENV === 'development') {
      await breakSeeder();
    }

    await queryRunner.commitTransaction();
    console.log('All seeding completed successfully');
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error('Error during seeding: ', error);
  } finally {
    await queryRunner.release();
    console.log('Query Runner has been released');
    await dataSource.destroy();
    console.log('Data Source has been closed');
  }
};

mainSeeder();
