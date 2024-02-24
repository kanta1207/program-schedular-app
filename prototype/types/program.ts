export interface Program {
  id: number;
  name: programName;
  createdAt?: Date;
  updatedAt?: Date;
}

export type programName = "DMS" | "DMA";
