import { CorsOptions } from 'cors'
import { ConnectionOptions } from 'typeorm'
import { BaseModel, IExceptionFilter, IValidationPipe } from '../common'
import { IController, IMiddleware } from '../container'

import { Type } from './common.interface'

export interface AppModule {
    controllers: Type<IController>[]
    validationPipe: Type<IValidationPipe>
    httpExceptionFilter: Type<IExceptionFilter>
    middleware: Type<IMiddleware>[]
    enableCors?: boolean | CorsOptions
    providers: Type[]
    model: Type<BaseModel>[]
}

export interface AppConfig {
    port: number
    dbOptions: ConnectionOptions
}
