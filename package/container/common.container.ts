import { injectable } from 'inversify'
import { interfaces } from 'inversify/lib/interfaces/interfaces'
import * as _ from 'lodash'
import {
    VALIDATION_PIPE,
    ValidationPipe,
    IValidationPipe
} from '../service/validation.pipe'
import {
    EXCEPTION,
    HttpExceptionFilter,
    IExceptionFilter
} from '../service/httpException.filter'

import LoggerService, { ILoggerService } from '../service/logger.service'

@injectable()
export class CommonContainer {
    constructor(private readonly container: interfaces.Container) {}

    register(
        customValidationPipe: IValidationPipe,
        customHttpExceptionFilter: IExceptionFilter
    ) {
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
}
