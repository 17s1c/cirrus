import { IncomingMessage, ServerResponse } from 'http';
import { Service } from './Service';

export interface Router extends Service {
  dispatch(req: IncomingMessage, res: ServerResponse): Promise<boolean>;
}

export const Router = Symbol.for('Router');
