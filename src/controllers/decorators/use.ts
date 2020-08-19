import 'reflect-metadata';
import { MetadataKeys } from './Constants';
import { RequestHandler } from 'express';

export function use(middleware: RequestHandler) {
  return function (target: Object, key: string, desc: PropertyDescriptor) {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

    middlewares.push(middleware);

    Reflect.defineMetadata(MetadataKeys.middleware, middlewares, target, key);
  };
}
