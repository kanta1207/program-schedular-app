import checkDateOrder from './check-date-order.util';

describe('checkDateOrder function', () => {
  const convertToUTC = (dateString: string) =>
    new Date(`${dateString}T08:00:00.000Z`);

  it('should return false if both newStartAt and newEndAt are undefined', () => {
    const result = checkDateOrder({
      newStartAt: undefined,
      newEndAt: undefined,
      existingStartAt: convertToUTC('2024-01-01'),
      existingEndAt: convertToUTC('2024-01-02'),
    });
    expect(result).toBe(false);
  });

  it('should return true if newStartAt and newEndAt are provided and in correct order', () => {
    const result = checkDateOrder({
      newStartAt: convertToUTC('2024-02-01'),
      newEndAt: convertToUTC('2024-02-02'),
      existingStartAt: convertToUTC('2024-01-01'),
      existingEndAt: convertToUTC('2024-01-02'),
    });
    expect(result).toBe(true);
  });

  it('should return false if newStartAt and newEndAt are provided but in incorrect order', () => {
    const result = checkDateOrder({
      newStartAt: convertToUTC('2024-02-02'),
      newEndAt: convertToUTC('2024-02-01'),
      existingStartAt: convertToUTC('2024-01-01'),
      existingEndAt: convertToUTC('2024-01-02'),
    });
    expect(result).toBe(false);
  });

  it('should return true if only newStartAt is provided and in correct order', () => {
    const result = checkDateOrder({
      newStartAt: convertToUTC('2024-01-02'),
      newEndAt: undefined,
      existingStartAt: convertToUTC('2024-01-01'),
      existingEndAt: convertToUTC('2024-01-03'),
    });
    expect(result).toBe(true);
  });

  it('should return false if only newStartAt is provided but in incorrect order', () => {
    const result = checkDateOrder({
      newStartAt: convertToUTC('2024-01-02'),
      newEndAt: undefined,
      existingStartAt: convertToUTC('2024-01-01'),
      existingEndAt: convertToUTC('2024-01-02'),
    });
    expect(result).toBe(false);
  });

  it('should return true if only newEndAt is provided and in correct order', () => {
    const result = checkDateOrder({
      newStartAt: undefined,
      newEndAt: convertToUTC('2024-01-03'),
      existingStartAt: convertToUTC('2024-01-01'),
      existingEndAt: convertToUTC('2024-01-02'),
    });
    expect(result).toBe(true);
  });

  it('should return false if only newEndAt is provided but in incorrect order', () => {
    const result = checkDateOrder({
      newStartAt: undefined,
      newEndAt: convertToUTC('2024-01-01'),
      existingStartAt: convertToUTC('2024-01-01'),
      existingEndAt: convertToUTC('2024-01-02'),
    });
    expect(result).toBe(false);
  });
});
