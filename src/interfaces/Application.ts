export interface Application {
  start(): Promise<any>;
}

export const Application = Symbol.for('Application');
