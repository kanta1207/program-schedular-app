import dataSource from '../data-source';
import { masterClassroomSeeder } from './masterClassroom.seeder';

const mainSeeder = async () => {
  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized');

    console.log('Start seeding...');
    await masterClassroomSeeder();
    // TODO: other seeder

    console.log('All seeding completed successfully.');
  } catch (error) {
    console.error('Error during seeding: ', error);
  } finally {
    await dataSource.destroy();
    console.log('Data Source has been closed');
  }
};

mainSeeder();
