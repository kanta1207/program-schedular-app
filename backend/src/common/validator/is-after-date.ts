import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

export const IsAfterDate =
  <T>(property: keyof T, options?: ValidationOptions) =>
  (object: any, propertyName: string) =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [property],
      validator: IsAfterDateConstraint,
    });

@ValidatorConstraint({ name: 'IsAfterDate' })
export class IsAfterDateConstraint implements ValidatorConstraintInterface {
  validate(value: any, args?: ValidationArguments): boolean {
    const [propertyNameToCompare] = args?.constraints || [];
    const propertyValue = (args?.object as any)[propertyNameToCompare];
    return Date.parse(value) > Date.parse(propertyValue);
  }

  defaultMessage(args?: ValidationArguments): string {
    const [propertyNameToCompare] = args?.constraints || [];

    return `${args?.property} must be after ${propertyNameToCompare}`;
  }
}
