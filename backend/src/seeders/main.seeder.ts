import dataSource from '../data-source';
import { breakSeeder } from './break.seeder';
import { classSeeder } from './class.seeder';
import { cohortSeeder } from './cohort.seeder';
import { courseSeeder } from './course.seeder';
import { coursesInstructorsSeeder } from './coursesInstructors.seeder';
import { instructorSeeder } from './instructor.seeder';
import { instructorsPeriodOfDaysSeeder } from './instructorsPeriodOfDays.seeder';
import { intakeSeeder } from './intake.seeder';
import { masterClassroomSeeder } from './masterClassroom.seeder';
import { masterContractTypeSeeder } from './masterContactType.seeder';
import { masterPeriodOfDaySeeder } from './masterPeriodOfDay.seeder';
import { masterWeekdaysRangeSeeder } from './masterWeekdaysRange.seeder';
import { programSeeder } from './program.seeder';

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
      await intakeSeeder();
      await programSeeder();
      await cohortSeeder();
      await courseSeeder();
      await instructorSeeder();
      await classSeeder();
      await coursesInstructorsSeeder();
      await instructorsPeriodOfDaysSeeder();
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
