import { Request, Response, NextFunction } from 'express'
import { decorate, injectable } from 'inversify'
import { MIDDLEWARE_METADATA } from '../container/middleware.container'
import LoggerService from './logger.service'

export interface IExceptionFilter<T = any> {
    catch(err: T, req: Request, res: Response, next: NextFunction): any
}

export const EXCEPTION_METADATA = 'MIDDLEWARE_METADATA'

export const EXCEPTION = Symbol.for('EXCEPTION')

export function ExceptionInjectable(options?: any): ClassDecorator {
    return (target: object) => {
        decorate(injectable(), target)
        Reflect.defineMetadata(EXCEPTION_METADATA, options, target)
    }
}

@injectable()
export class HttpExceptionFilter implements IExceptionFilter {
    constructor(private readonly loggerService: LoggerService) {}

    catch(err, req: Request, res: Response, next: NextFunction): void {
        this.loggerService.errorLog(err)
        res.status(err?.status || 500)
        res.send({
            code: err?.code,
            error: err?.message
        })
    }
}
