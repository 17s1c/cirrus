import { Request, Response, NextFunction } from 'express'
import {
    Exception,
    IExceptionFilter,
} from '../../../package/service/httpException.filter'
import LoggerService from '../../../package/service/logger.service'

@Exception()
export class MyHttpExceptionFilter implements IExceptionFilter {
    constructor(private readonly loggerService: LoggerService) {}

    catch(err, req: Request, res: Response, next: NextFunction): void {
        this.loggerService.error(err)
        res.status(err?.status || 500)
        res.send({
            code: err?.code,
            error: err?.message,
        })
    }
}
