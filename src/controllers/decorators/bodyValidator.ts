import 'reflect-metadata';
import { MetadataKeys } from './Constants';

export function bodyValidator(...keys: string[]) {
  return function (target: Object, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
  };
}
