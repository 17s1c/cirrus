import 'reflect-metadata'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { interfaces } from 'inversify/lib/interfaces/interfaces'
import * as _ from 'lodash'
import * as core from 'express-serve-static-core'
import { appConfig } from './app.config'
import { Container } from 'inversify'
import { CommonContainer } from './container/common.container'
import { ControllerContainer } from './container/controller.container'
import { MiddlewareContainer } from './container/middleware.container'
import { ServiceContainer } from './container/service.container'
import { VALIDATION_PIPE, IValidationPipe } from './service/validation.pipe'
import { REQUEST, IRequest } from './container/request.container'
import { RESPONSE, IResponse } from './container/response.container'
import { EXCEPTION, IExceptionFilter } from './service/httpException.filter'

export interface ContextInterface {
    readonly requestID: string
    readonly request: IRequest
    readonly response: IResponse
}

class App {
    private static application: App

    private appContainer: interfaces.Container = new Container()
    private middlewareContainer: MiddlewareContainer
    private controllerContainer: ControllerContainer
    private commonContainer: CommonContainer
    private serviceContainer: ServiceContainer

    private constructor(private readonly app: core.Express) {}

    get validationPipe(): IValidationPipe {
        return this.appContainer.get<IValidationPipe>(VALIDATION_PIPE)
    }

    get container(): interfaces.Container {
        return this.appContainer
    }

    getRequest(requestID: string): IRequest {
        return this.appContainer.get<IRequest>(`${REQUEST}:${requestID}`)
    }

    getResponse(requestID: string): IResponse {
        return this.appContainer.get<IResponse>(`${RESPONSE}:${requestID}`)
    }

    getService<T>(service: any): T {
        return this.appContainer.get(service)
    }

    validate<T>(value: any, metaType: any): T {
        return this.validationPipe.transform(value, metaType)
    }

    private _service() {
        this.serviceContainer = new ServiceContainer(this.appContainer)
        this.serviceContainer.register(appConfig.service)
    }

    private _middleware() {
        this.middlewareContainer = new MiddlewareContainer(
            this.app,
            this.appContainer
        )
        this.middlewareContainer.register(appConfig.middleware)
    }

    private _router() {
        this.controllerContainer = new ControllerContainer(
            this.app,
            this.appContainer
        )
        this.controllerContainer.register(appConfig.controllers)
    }

    private _common() {
        this.commonContainer = new CommonContainer(this.appContainer)
        this.commonContainer.register(
            appConfig.validationPipe,
            appConfig.httpExceptionFilter
        )
    }

    listen(port: number, callback: () => any) {
        this.app.listen(port, callback)
    }

    static init(): App {
        const app = express()
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        App.application = new App(app)
        App.application._common()
        App.application._service()
        App.application._middleware()
        App.application._router()
        const httpExceptionFilter = App.application.container.get<
            IExceptionFilter
        >(EXCEPTION)
        app.use((err, req, res, next) =>
            httpExceptionFilter.catch(err, req, res, next)
        )
        return App.application
    }
}

export const Application = App.init()
