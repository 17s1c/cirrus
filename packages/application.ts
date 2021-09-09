import 'reflect-metadata'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { interfaces } from 'inversify/lib/interfaces/interfaces'
import * as core from 'express-serve-static-core'
import { Container } from 'inversify'
import { EXCEPTION, IExceptionFilter } from './common'
import {
    CommonContainer,
    ControllerContainer,
    MiddlewareContainer,
    ProviderContainer,
    RepositoryContainer,
} from './container'
import { AppConfig, AppModule } from './token'
import * as dotenv from 'dotenv'
const result = dotenv.config()
if (result.error) {
    throw result.error
}

export class App {
    static Application: App
    static Provider: ProviderContainer
    static Middleware: MiddlewareContainer
    static Router: ControllerContainer
    static Repository: RepositoryContainer
    static Common: CommonContainer

    private readonly appContainer: interfaces.Container = new Container()

    private constructor(
        private readonly app: core.Express,
        private readonly appModule: AppModule,
        private readonly appConfig: AppConfig,
    ) {}

    get container(): interfaces.Container {
        return this.appContainer
    }

    private _provider(): ProviderContainer {
        const providerContainer = new ProviderContainer(this.appContainer)
        providerContainer.register(this.appModule.providers)
        return providerContainer
    }

    private _middleware(): MiddlewareContainer {
        const middlewareContainer = new MiddlewareContainer(
            this.app,
            this.appContainer,
        )
        middlewareContainer.register(this.appModule.middleware)
        return middlewareContainer
    }

    private _router(): ControllerContainer {
        const controllerContainer = new ControllerContainer(
            this.app,
            this.appContainer,
        )
        controllerContainer.register(this.appModule.controllers)
        return controllerContainer
    }

    private _common(): CommonContainer {
        const commonContainer = new CommonContainer(this.appContainer)
        commonContainer.register(
            this.appModule.validationPipe,
            this.appModule.httpExceptionFilter,
        )
        return commonContainer
    }

    private async _repository(): Promise<RepositoryContainer> {
        const repositoryContainer = new RepositoryContainer(this.appContainer, {
            ...this.appConfig.dbOptions,
            entities: this.appModule.model,
        })
        await repositoryContainer.register(this.appModule.model)
        return repositoryContainer
    }

    listen() {
        this.app.listen(this.appConfig.port, () =>
            console.log(`application running on port ${this.appConfig.port}`),
        )
    }

    static async init(
        appModule: AppModule,
        appConfig: AppConfig,
    ): Promise<App> {
        if (App.Application) return App.Application
        const app = express()
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        App.Application = new App(app, appModule, appConfig)
        App.Common = App.Application._common()
        await App.Application._repository()
        App.Provider = App.Application._provider()
        App.Middleware = App.Application._middleware()
        App.Router = App.Application._router()
        const httpExceptionFilter = App.Application.container.get<
            IExceptionFilter
        >(EXCEPTION)
        app.use((err, req, res, next) =>
            httpExceptionFilter.catch(err, req, res, next),
        )
        App.Application.listen()
        return App.Application
    }
}
