import { injectable } from 'inversify'
import { interfaces } from 'inversify/lib/interfaces/interfaces'
import * as _ from 'lodash'
import {
    VALIDATION_PIPE,
    ValidationPipe,
    IValidationPipe,
} from '../common/validation.pipe'
import {
    EXCEPTION,
    HttpExceptionFilter,
    IExceptionFilter,
} from '../common/httpException.filter'

import LoggerService, { ILoggerService } from '../common/logger.service'
import { Type } from '../token/interface/common.interface'

@injectable()
export class CommonContainer {
    constructor(private readonly container: interfaces.Container) {}

    register(
        customValidationPipe: Type<IValidationPipe>,
        customHttpExceptionFilter: Type<IExceptionFilter>,
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

    get validationPipe(): IValidationPipe {
        return this.container.get<IValidationPipe>(VALIDATION_PIPE)
    }

    validate<T>(value: any, metaType: any): T {
        return this.validationPipe.transform(value, metaType)
    }
}
