import { DecoratorTarget, Type } from './util';

export function inject(token?: any) {
  return (target: DecoratorTarget, propertyKey?: string, descriptor?: number | PropertyDescriptor) => {
    // const t = Type(target);
    Reflect.defineMetadata('1223', token, target);
  };
}
