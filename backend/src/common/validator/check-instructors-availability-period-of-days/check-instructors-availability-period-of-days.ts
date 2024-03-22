import { MasterPeriodOfDay } from 'src/entity';

export const checkInstructorsAvailabilityPeriodOfDays = (
  periodOfDays: MasterPeriodOfDay[],
  periodOfDayId: number,
): string | null => {
  console.log(periodOfDays);
  console.log(periodOfDayId);

  const isAvailable = periodOfDays.some(
    (availablePeriod) => availablePeriod.id === periodOfDayId,
  );
  if (!isAvailable) {
    return `Instructor is not available at that period`;
  }
  return null;
};
