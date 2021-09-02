import { ConnectionOptions } from 'typeorm'
import BaseModel from '../common/base.model'
import { IExceptionFilter } from '../common/httpException.filter'
import { IValidationPipe } from '../common/validation.pipe'
import { IController } from '../container/controller.container'
import { IMiddleware } from '../container/middleware.container'
import { Type } from '../token/interface/common.interface'

export interface ControllerConfig {
    Api: string
    Controller: Type<IController>
}

export interface AppModule {
    controllers: ControllerConfig[]
    validationPipe: Type<IValidationPipe>
    httpExceptionFilter: Type<IExceptionFilter>
    middleware: Type<IMiddleware>[]
    providers: Type[]
    model: Type<BaseModel>[]
}

export interface AppConfig {
    port: number
    dbOptions: ConnectionOptions
}
