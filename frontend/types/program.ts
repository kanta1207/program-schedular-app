export interface Program {
  id: number;
  name: ProgramName;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProgramName = 'DMS' | 'DMA';
