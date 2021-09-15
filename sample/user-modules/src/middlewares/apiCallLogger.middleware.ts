import { Request, Response } from 'express'
import { get } from 'lodash'
import { LoggerService, IMiddleware, MiddleInter } from '../../../../packages'
import Home from '../controllers/home'

@MiddleInter({ controllers: [Home] })
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
