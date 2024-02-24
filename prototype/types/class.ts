export interface Class {
  id: number;
  rangeId: number;
  slotId: number;
  courseId: number;
  instructorId: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}
