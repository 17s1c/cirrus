export interface Configuration {
  get<T>(key: string): T;
  set<T>(key: string, value: T): void;
}

export const Configuration = Symbol.for('Configuration')