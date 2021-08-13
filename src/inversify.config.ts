import 'reflect-metadata';
import { Container } from 'inversify';

import { ConfigurationImpl } from './impl/Configuration';
import { Configuration } from './interfaces/Configuration';
// import { Session } from './interfaces/Session';
// import { SessionImpl } from './impl/Session';
// import { ContextFactory, Context } from './interfaces/Context';
import { Router } from './interfaces/Router';
import { RouterImpl } from './impl/RouterOfJsonRpc';
import { Render } from './interfaces/Render';
import { RenderImpl } from './impl/Render';

import { Controller } from './interfaces/Controller';
import { Home } from './user-modules/src/controllers/home';

const container = new Container();

container.bind(Configuration).to(ConfigurationImpl).inSingletonScope();
container.bind(Router).to(RouterImpl).inSingletonScope();
container.bind(Render).to(RenderImpl).inSingletonScope();

// container.bind(ContextFactory).toFactory((ctx: interfaces.Context) => {
//   return (req, res): Context => {
//     const context: Context = {
//       req,
//       res,
//     };
//     // const childContainer = new Container();
//     // childContainer.parent = ctx.container;
//     // childContainer.bind(Context).toConstantValue(context);
//     return context;
//   };
// });
// container.bind(Session).to(SessionImpl);

// container.bind(API).to(Home).whenTargetNamed('Home');

// 遍历 controller，并将其绑定到容器
container.bind(Controller).to(Home).whenTargetNamed('Home');
// for (let controller of Reflect.getMetadata("design:type", this, "Controller")) {
//     container.bind(controller).toSelf().inSingletonScope();
// }

// 启动前执行的函数
// for (let service of container.getAll(Service)) {
//     service.beforeStart();
// }

export { container };
