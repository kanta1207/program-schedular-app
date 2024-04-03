import { MasterPeriodOfDay } from 'src/entity';

export const checkInstructorsAvailabilityPeriodOfDays = (
  periodOfDays: MasterPeriodOfDay[],
  periodOfDayId: number,
): string | null => {
  const isAvailable = periodOfDays.some(
    (availablePeriod) => availablePeriod.id === periodOfDayId,
  );
  if (!isAvailable) {
    return `Instructor is not available at this period`;
  }
  return null;
};
