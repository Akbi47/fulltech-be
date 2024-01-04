import {
  ClassConstructor,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';

/**
 * Convert camelCase to snake_case
 * @param type output type
 * @param data source data
 * @param excludeExtraneous Indicates if extraneous properties should be excluded from the value
 * @returns Object with snake_case attribute
 */
export function snakeCaseKeys<T>(
  type: ClassConstructor<T>,
  data: T | T[],
  excludeExtraneous?: boolean,
) {
  const request = plainToInstance(type, data, {
    exposeDefaultValues: true,
    excludeExtraneousValues: excludeExtraneous ? true : false,
  });
  return instanceToPlain(request, {
    exposeDefaultValues: false,
    exposeUnsetFields: false,
  });
}

/**
 * Convert snake_case to camelCase
 * @param type output type
 * @param data source data
 * @returns Object with camelCase attribute
 */
export function camelCaseKeys<T>(type: ClassConstructor<T>, data: T | T[]) {
  return plainToInstance(type, data, {
    exposeDefaultValues: true,
    exposeUnsetFields: false,
  });
}
