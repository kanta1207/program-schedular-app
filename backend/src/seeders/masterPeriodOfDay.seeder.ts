import dataSource from '../data-source';
import { MasterPeriodOfDay } from 'src/entity/masterPeriodOfDays.entity';
import { seederWrapper } from './utils';

const periodOfDays = [
  { name: 'Morning' },
  { name: 'Afternoon' },
  { name: 'Evening' },
].map((periodOfDay, i) => {
  return { id: i + 1, ...periodOfDay };
});

export const masterPeriodOfDaySeeder = async () => {
  seederWrapper('master_contract_types', async () => {
    const masterContractTypeRepo = dataSource.getRepository(MasterPeriodOfDay);
    await masterContractTypeRepo.save(periodOfDays);
  });
};
