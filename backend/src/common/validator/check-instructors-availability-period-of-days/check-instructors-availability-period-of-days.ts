import { MasterPeriodOfDay } from 'src/entity';

export const checkInstructorsAvailabilityPeriodOfDays = (
  periodOfDays: MasterPeriodOfDay[],
  periodOfDayId: number,
  periodOfDayName: string,
): string | null => {
  const isAvailable = periodOfDays.some(
    (availablePeriod) => availablePeriod.id === periodOfDayId,
  );

  if (!isAvailable) {
    return `Unavailable for ${periodOfDayName} class.`;
  }
  return null;
};
