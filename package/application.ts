import 'reflect-metadata'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { interfaces } from 'inversify/lib/interfaces/interfaces'
import * as _ from 'lodash'
import * as core from 'express-serve-static-core'
import { appConfig } from './app.config'
import { Container, decorate, injectable } from 'inversify'
import { CommonContainer } from './container/common.container'
import { ControllerContainer } from './container/controller.container'
import { MiddlewareContainer } from './container/middleware.container'
import {
    validationPipe,
    ValidationPipe,
    ValidationPipeInterface
} from './container/validationPipe.container'
import { REQUEST, IRequest } from './container/request.container'
import { RESPONSE, IResponse } from './container/response.container'

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

    private constructor(private readonly app: core.Express) {}

    get validationPipe(): ValidationPipeInterface {
        return this.appContainer.get<ValidationPipeInterface>(validationPipe)
    }

    getRequest(requestID: string): IRequest {
        return this.appContainer.get<IRequest>(`${REQUEST}:${requestID}`)
    }

    getResponse(requestID: string): IResponse {
        return this.appContainer.get<IResponse>(`${RESPONSE}:${requestID}`)
    }

    getContainer(): interfaces.Container {
        return this.appContainer
    }

    validate<T>(value: any, metaType: any): T {
        return this.validationPipe.transform(value, metaType)
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
        this.commonContainer.register()
    }

    listen(port: number, callback: () => any) {
        this.app.listen(port, callback)
    }

    static init(): App {
        const app = express()
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        App.application = new App(app)
        //
        const container = App.application.getContainer()
        const validationMiddleware = _.isFunction(appConfig.validationPipe)
            ? (appConfig.validationPipe as any)
            : ValidationPipe
        decorate(injectable(), validationMiddleware)
        container
            .bind<ValidationPipeInterface>(validationPipe)
            .to(validationMiddleware)
        App.application._common()
        App.application._middleware()
        App.application._router()
        return App.application
    }
}

export const Application = App.init()
