import dataSource from '../data-source';
import { MasterContractType } from 'src/entity/masterContractType.entity';
import { seederWrapper } from './utils';

const contractTypes = [
  { name: 'Full time', maxHours: 40, minHours: 30 },
  { name: 'Part time', maxHours: 20, minHours: 10 },
  { name: 'Contract', maxHours: null, minHours: null },
].map((contractType, i) => {
  return { id: i + 1, ...contractType };
});

export const masterContractTypeSeeder = async () => {
  seederWrapper('master_contract_types', async () => {
    const masterContractTypeRepo = dataSource.getRepository(MasterContractType);
    await masterContractTypeRepo.save(contractTypes);
  });
};
