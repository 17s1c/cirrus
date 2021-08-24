import { Request, Response } from 'express'
import { get } from 'lodash'
import {
    MiddlewareInjectable,
    IMiddleware
} from '../../../package/container/middleware.container'
import LoggerService from '../../../package/service/logger.service'

@MiddlewareInjectable({ api: ['/home', '/demo'] })
export class APICallLoggerMiddleware implements IMiddleware {
    constructor(private readonly loggerService: LoggerService) {}

    use(req: Request, _: Response, next): void {
        this.loggerService.infoLog({
            type: 'API Call Logger',
            url: get(req, 'url'),
            params: get(req, 'params.0'),
            method: get(req, 'method'),
            query: get(req, 'query'),
            body: get(req, 'body')
        })
        next()
    }
}
