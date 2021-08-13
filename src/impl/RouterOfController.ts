import { Container, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller } from '../interfaces/Controller';
import { Router } from '../interfaces/Router';

import { Home } from '../user-modules/src/controllers/home';

@injectable()
export class RouterImpl implements Router {
  readonly container = new Container();

  async beforeStart(): Promise<any> {
    // 遍历 controller，并将其绑定到容器
    this.container.bind(Controller).to(Home).whenTargetNamed('Home');
    // for (let controller of Reflect.getMetadata("design:type", this, "Controller")) {
    //     container.bind(controller).toSelf().inSingletonScope();
    // }
  }

  async dispatch(req: Request, res: Response) {
    // 根据 req 计算分发路径
    // const { req } = ctx;
    // const name = nameFrom(req);
    const cls = 'Home';
    const method = 'index';

    const controller = this.container.getNamed<Controller>(Controller, cls);

    try {
      // TODO: 填入参数
      const result = controller[method].apply(controller, [req.url]);
      if (result instanceof Promise) {
        const data = await result;
        // TODO: data 可能是其他类型的数据
        res.json(data);
      } else {
        res.json(result);
      }
    } catch (e) {
      res.status(500).send(e.message);
      // logger
      console.error('router error:', e);
    }

    return true;
  }
}
