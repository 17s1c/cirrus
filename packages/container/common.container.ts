import * as cors from 'cors'
import * as express from 'express'
import { injectable } from 'inversify'
import { interfaces } from 'inversify/lib/interfaces/interfaces'
import * as _ from 'lodash'
import {
    EXCEPTION,
    HttpExceptionFilter,
    IExceptionFilter,
    ILoggerService,
    IValidationPipe,
    LoggerService,
    VALIDATION_PIPE,
    ValidationPipe,
} from '../common'
import { Type } from '../token'

@injectable()
export class CommonContainer {
    constructor(
        private readonly container: interfaces.Container,
        private readonly app: express.Express,
    ) {}

    register(
        customValidationPipe: Type<IValidationPipe>,
        customHttpExceptionFilter: Type<IExceptionFilter>,
        enableCors?: boolean | cors.CorsOptions,
    ) {
        if (_.isBoolean(enableCors) && enableCors) {
            this.app.use(cors())
        } else if (_.isObject(enableCors)) {
            this.app.use(cors(enableCors))
        }
        this.container.bind<ILoggerService>(LoggerService).toSelf()

        const validationMiddleware = _.isFunction(customValidationPipe)
            ? (customValidationPipe as any)
            : ValidationPipe
        this.container
            .bind<IValidationPipe>(VALIDATION_PIPE)
            .to(validationMiddleware)

        const httpExceptionFilter = _.isFunction(customHttpExceptionFilter)
            ? (customHttpExceptionFilter as any)
            : HttpExceptionFilter
        this.container.bind<IExceptionFilter>(EXCEPTION).to(httpExceptionFilter)
    }

    get validationPipe(): IValidationPipe {
        return this.container.get<IValidationPipe>(VALIDATION_PIPE)
    }

    validate<T>(value: any, metaType: any): T {
        return this.validationPipe.transform(value, metaType)
    }
}
