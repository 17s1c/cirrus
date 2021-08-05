import { IncomingMessage, ServerResponse } from 'http';
import { Session } from './Session';

export interface Context {
  req: IncomingMessage;
  res: ServerResponse;
  session?: Session;
  [key: string]: any;
}

export const Context = Symbol.for('Context');

export const ContextFactory = Symbol.for('ContextFactory');
