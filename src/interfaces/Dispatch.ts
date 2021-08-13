import http from 'http';
import { Service } from './Service';

export interface Dispatch extends Service {
  // 返回 true 表示已经处理
  // 返回 false 表示未处理，调用者可以自行决定是否继续处理
  dispatch(req: http.IncomingMessage, res: http.ServerResponse): Promise<boolean>;
}

export const Dispatch = Symbol.for('Dispatch');
