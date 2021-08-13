import { injectable } from 'inversify';
import { Request, Response } from 'express';
import { jsonRpcError, jsonRpcResponse } from '../utils';
import { Router } from '../interfaces/Router';

// 后续这部分代码需要自动生成
import * as comments from '../user-modules/src/api/comments';

export interface RPCRequest {
  id: string;
  method: string;
  params: any[];
}

@injectable()
export class RouterImpl implements Router {
  private routes = new Map<string, any>();

  async beforeStart(): Promise<any> {
    // TODO: comments 会导出 config，这部分需要处理一下
    // 这里简化处理，直接挂载 comments
    this.routes.set('comments', comments);
  }

  async dispatch(req: Request, res: Response) {
    // 根据 req 计算分发路径
    const { id, method, params } = req.body;
    const [clsName, methodName] = method.split('.');

    try {
      const inst = this.routes.get(clsName) || {};
      const fn = inst[methodName];

      if (typeof fn !== 'function') {
        res.json(jsonRpcError(id, 404, 'method not implement'));
      }

      // 在调用真正处理函数前，调用拦截器（中间件）
      // const middlewares = container.getAll(Middleware);
      // const composed = compose(middlewares);

      const result = fn.apply(inst, params);

      if (result instanceof Promise) {
        res.json(jsonRpcResponse(id, await result));
      } else {
        res.json(jsonRpcResponse(id, result));
      }
    } catch (e) {
      // TODO: logger
      console.error('RouterOfJsonRpc Error:', e);
      res.json(jsonRpcError(id, 500, e.message));
    } finally {
      return true;
    }
  }
}
