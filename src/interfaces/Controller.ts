import { Context } from './Context';

export interface Controller {
  ctx: Context;
  [key: string]: any;
}

export const Controller = Symbol.for('Controller');
