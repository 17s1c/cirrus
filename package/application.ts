import 'reflect-metadata'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { interfaces } from 'inversify/lib/interfaces/interfaces'
import * as core from 'express-serve-static-core'
import { Container } from 'inversify'
import { CommonContainer } from './container/common.container'
import { ControllerContainer } from './container/controller.container'
import { MiddlewareContainer } from './container/middleware.container'
import { RepositoryContainer } from './container/repository.container'
import { ProviderContainer } from './container/provider.container'
import { EXCEPTION, IExceptionFilter } from './common/httpException.filter'
import { AppConfig, AppModule } from './interfaces/config.interface'

export class App {
    static Application: App
    static Provider: ProviderContainer
    static Middleware: MiddlewareContainer
    static Controller: ControllerContainer
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
        App.Controller = App.Application._router()
        const httpExceptionFilter = App.Application.container.get<
            IExceptionFilter
        >(EXCEPTION)
        app.use((err, req, res, next) =>
            httpExceptionFilter.catch(err, req, res, next),
        )
        return App.Application
    }
}
