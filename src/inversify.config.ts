import 'reflect-metadata';
import { Container } from 'inversify';

import { ConfigurationImpl } from './impl/Configuration';
import { Configuration } from './interfaces/Configuration';
// import { Session } from './interfaces/Session';
// import { SessionImpl } from './impl/Session';
import { Router } from './interfaces/Router';
import { RouterImpl } from './impl/RouterOfJsonRpc';
import { Render } from './interfaces/Render';
import { RenderImpl } from './impl/Render';
import { Dispatch } from './interfaces/Dispatch';
import { DispatchImpl } from './impl/Dispatch';
import { Application } from './interfaces/Application';
import { ApplicationImpl } from './impl/Application';

const container = new Container({ defaultScope: 'Singleton' });

container.bind(Configuration).to(ConfigurationImpl);
container.bind(Router).to(RouterImpl);
container.bind(Render).to(RenderImpl);
container.bind(Dispatch).to(DispatchImpl);
container.bind(Application).to(ApplicationImpl);

// container.bind(Session).to(SessionImpl);

export { container };
