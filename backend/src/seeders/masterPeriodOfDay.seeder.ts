import dataSource from '../data-source';
import { MasterPeriodOfDay } from 'src/entity';
import { seederWrapper } from './utils';

const periodOfDays = [
  { name: 'Morning', time: '8:30 - 12:30' },
  { name: 'Afternoon', time: '1:00 - 5:00' },
  { name: 'Evening', time: '5:30 - 9:30' },
].map((periodOfDay, i) => {
  return { id: i + 1, ...periodOfDay };
});

export const masterPeriodOfDaySeeder = async () => {
  await seederWrapper('master_period_of_days', async () => {
    const masterPeriodOfDayRepo = dataSource.getRepository(MasterPeriodOfDay);
    await masterPeriodOfDayRepo.save(periodOfDays);
  });
};
