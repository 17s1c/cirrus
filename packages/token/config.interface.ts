import { ConnectionOptions } from 'typeorm'
import { BaseModel, IExceptionFilter, IValidationPipe } from '../common'
import { IController, IMiddleware } from '../container'

import { Type } from './common.interface'

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
