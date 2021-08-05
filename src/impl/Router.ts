import { Context } from '../interfaces/Context';
import { Controller } from '../interfaces/Controller';
import { Router } from '../interfaces/Router';
import { Container, injectable } from 'inversify';

@injectable()
export class RouterImpl implements Router {
  dispatch(ctx: Context, container: Container) {
    // 根据 req 计算分发路径
    // const { req } = ctx;
    // const name = nameFrom(req);
    const cls = 'Home';
    const method = 'index';

    const controller = container.getNamed<Controller>(Controller, cls);

    // TODO: 填入参数
    return () => controller[method].apply(controller, [ctx.req.url]);
    // throw new Error("Method not implemented.");
  }
}

// globalThis.xxxx = "xxxx";
