import dataSource from '../data-source';
import { MasterWeekdaysRange } from '../entity/masterWeekdaysRanges.entity';
import { seederWrapper } from './utils';

const weekdaysRanges = [
  { name: 'Mon - Fri' },
  { name: 'Mon - Wed' },
  { name: 'Wed - Fri' },
].map((weekdaysRange, i) => {
  return { id: i + 1, ...weekdaysRange };
});

export const masterWeekdaysRangeSeeder = async () => {
  await seederWrapper('master_weekdays_ranges', async () => {
    const masterWeekdaysRangeRepo =
      dataSource.getRepository(MasterWeekdaysRange);
    await masterWeekdaysRangeRepo.save(weekdaysRanges);
  });
};
