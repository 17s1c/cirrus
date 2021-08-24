import { Request, Response, NextFunction } from 'express'
import {
    ExceptionInjectable,
    IExceptionFilter
} from '../../../package/service/httpException.filter'
import LoggerService from '../../../package/service/logger.service'

@ExceptionInjectable()
export class MyHttpExceptionFilter implements IExceptionFilter {
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
