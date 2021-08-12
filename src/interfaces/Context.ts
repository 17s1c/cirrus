import { IncomingMessage, ServerResponse } from 'http';
import { RPCRequest } from 'impl/RouterOfJsonRpc';
import { Session } from './Session';

export interface Context {
  req: { body: RPCRequest } & IncomingMessage;
  res: ServerResponse;
  session?: Session;
  [key: string]: any;
}

export const Context = Symbol.for('Context');

export const ContextFactory = Symbol.for('ContextFactory');
