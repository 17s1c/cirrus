type Prototype<T> = {
  [Property in keyof T]: T[Property] extends Function ? T[Property] : T[Property] | undefined;
} & { constructor: Function };

interface ConstructorFunction<T = Object> {
  new (...args: unknown[]): T;
  prototype: Prototype<T>;
}

export type DecoratorTarget<T = Object> = ConstructorFunction<T> | Prototype<T>;

export function Type(type: any) {
  return Reflect.metadata('design:type', type);
}
export function ParamTypes(...types: any[]) {
  return Reflect.metadata('design:paramtypes', types);
}
export function ReturnType(type: any) {
  return Reflect.metadata('design:returntype', type);
}
