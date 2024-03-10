export interface BreakBase {
  id: number;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetBreaksResponse extends BreakBase {}

export interface CreateBreakResponse extends BreakBase {}

export interface UpdateBreakResponse extends BreakBase {}
