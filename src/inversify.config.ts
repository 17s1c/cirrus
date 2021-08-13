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
import { Dispatch } from './interfaces/Dispatch';
import { DispatchImpl } from './impl/Dispatch';
import { Application } from './interfaces/Application';
import { ApplicationImpl } from './impl/Application';

const container = new Container();

container.bind(Configuration).to(ConfigurationImpl).inSingletonScope();
container.bind(Router).to(RouterImpl).inSingletonScope();
container.bind(Render).to(RenderImpl).inSingletonScope();
container.bind(Dispatch).to(DispatchImpl).inSingletonScope();
container.bind(Application).to(ApplicationImpl).inSingletonScope();

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

export { container };
