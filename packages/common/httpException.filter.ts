import { Request, Response, NextFunction } from 'express'
import { injectable } from 'inversify'
import { decorateClass } from '../utils'

import { LoggerService } from './logger.service'

export interface IExceptionFilter<T = any> {
    catch(err: T, req: Request, res: Response, next: NextFunction): any
}

export const EXCEPTION_METADATA = 'MIDDLEWARE_METADATA'

export const EXCEPTION = Symbol.for('EXCEPTION')

export function Exception(options?: any): ClassDecorator {
    return (target: object) => {
        decorateClass([injectable()], target)
        Reflect.defineMetadata(EXCEPTION_METADATA, options, target)
    }
}

@injectable()
export class HttpExceptionFilter implements IExceptionFilter {
    constructor(private readonly loggerService: LoggerService) {}

    catch(err, req: Request, res: Response, next: NextFunction): void {
        this.loggerService.error(err)
        res.status(err?.status || 500)
        res.send({
            code: err?.code,
            error: err?.message || 'Internal server error',
        })
    }
}
