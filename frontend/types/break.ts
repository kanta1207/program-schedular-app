export interface BreakBase {
  id: number;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type GetBreaksResponse = BreakBase[];

export interface CreateBreakResponse extends BreakBase {}

export interface UpdateBreakResponse extends BreakBase {}
