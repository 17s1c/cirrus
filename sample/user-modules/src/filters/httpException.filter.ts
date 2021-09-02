import {
    Exception,
    IExceptionFilter,
} from 'cirri/lib/common/httpException.filter'
import LoggerService from 'cirri/lib/common/logger.service'
import { Request, Response, NextFunction } from 'express'

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
