import LoggerService from 'cirri/lib/common/logger.service'
import {
    IMiddleware,
    Middleware,
} from 'cirri/lib/container/middleware.container'
import { Request, Response } from 'express'
import { get } from 'lodash'

@Middleware({ api: ['/home', '/demo'] })
export class APICallLoggerMiddleware implements IMiddleware {
    constructor(private readonly loggerService: LoggerService) {}

    use(req: Request, _: Response, next): void {
        this.loggerService.info({
            type: 'API Call Logger',
            url: get(req, 'url'),
            params: get(req, 'params.0'),
            method: get(req, 'method'),
            query: get(req, 'query'),
            body: get(req, 'body'),
        })
        next()
    }
}
