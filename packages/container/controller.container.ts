import * as express from 'express'
import { injectable } from 'inversify'
import { interfaces } from 'inversify/lib/interfaces/interfaces'
import * as _ from 'lodash'
import * as uniqid from 'uniqid'
import { Type } from '../token'
import { decorateClass, generateRouterPath } from '../utils'

import { Options } from './middleware.container'
import { REQUEST, RequestContainer, IRequest } from './request.container'
import { RESPONSE, ResponseContainer, IResponse } from './response.container'

export interface ContextInterface {
    readonly requestID: string
    readonly request: IRequest
    readonly response: IResponse
}

export interface IController {
    index(context: ContextInterface): any
}

export const CONTROLLER_METADATA = 'CONTROLLER_METADATA'

export function Controller(options: any = {}): ClassDecorator {
    return (target: object) => {
        decorateClass([injectable()], target)
        Reflect.defineMetadata(CONTROLLER_METADATA, options, target)
    }
}

@injectable()
export class ControllerContainer {
    constructor(
        private readonly app: express.Express,
        private readonly container: interfaces.Container,
    ) {}

    register(controllers: Type<IController>[]) {
        const router = express.Router()
        _.map(controllers, Controller => {
            const metaData: Options = Reflect.getMetadata(
                CONTROLLER_METADATA,
                Controller,
            )
            if (_.isNil(metaData)) {
                decorateClass([injectable()], Controller)
            }
            this.container.bind<IController>(Controller).toSelf()
            const controller: any = this.container.get(Controller)
            router.post(
                generateRouterPath(Controller),
                async (req, res, next) => {
                    const requestID = uniqid.process('api-')
                    const REQ = `${REQUEST}:${requestID}`
                    const RES = `${RESPONSE}:${requestID}`
                    const requestImp = new RequestContainer(req)
                    const responseImp = new ResponseContainer(res)
                    this.container.bind<IRequest>(REQ).toDynamicValue(() => {
                        return requestImp
                    })
                    this.container.bind<IResponse>(RES).toDynamicValue(() => {
                        return responseImp
                    })
                    try {
                        const data = await controller.index(req.body)
                        res.send(data)
                    } catch (err) {
                        next(err)
                    } finally {
                        this.container.unbind(REQ)
                        this.container.unbind(RES)
                    }
                },
            )
        })
        this.app.use('/', router)
    }

    getRequest(requestID: string): IRequest {
        return this.container.get<IRequest>(`${REQUEST}:${requestID}`)
    }

    getResponse(requestID: string): IResponse {
        return this.container.get<IResponse>(`${RESPONSE}:${requestID}`)
    }
}
