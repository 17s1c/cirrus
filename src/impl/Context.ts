import { IncomingMessage, ServerResponse } from 'http';
import { inject, injectable } from 'inversify';
import { Context } from '../interfaces/Context';
import { Session } from '../interfaces/Session';
import { RPCRequest } from './RouterOfJsonRpc';

@injectable()
export class ContextImpl implements Context {
  [key: string]: any;
  req!: { body: RPCRequest } & IncomingMessage;
  res!: ServerResponse;

  @inject(Session)
  session!: Session;

  // set req(req: any) {
  //     this.req = req;
  // }

  // [key: string]: any;
  // session: Session;
  // req: Request;
  // res: Response;
}
