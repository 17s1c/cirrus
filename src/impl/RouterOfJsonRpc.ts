import { Container, injectable } from 'inversify';
import { jsonRpcError, jsonRpcResponse } from '../utils';
import { Context } from '../interfaces/Context';
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

  dispatch(ctx: Context, container: Container) {
    // 根据 req 计算分发路径
    const { id, method, params } = ctx.req.body;
    const [clsName, methodName] = method.split('.');

    return () => {
      try {
        const inst = this.routes.get(clsName) || {};
        const fn = inst[methodName];

        if (typeof fn !== 'function') {
          return jsonRpcError(id, 404, 'method not implement');
        }

        const result = fn.apply(inst, params);

        if (result instanceof Promise) {
          result
            .then(data => {
              jsonRpcResponse(id, data);
            })
            .catch(err => {
              throw err;
            });
        } else {
          return jsonRpcResponse(id, result);
        }
      } catch (e) {
        // TODO: logger
        console.error('RouterOfJsonRpc Error:', e);
        return jsonRpcError(id, 500, e.message);
      }
    };
  }
}
