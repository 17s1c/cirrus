import * as express from 'express'
import { decorate, injectable } from 'inversify'
import { interfaces } from 'inversify/lib/interfaces/interfaces'
import * as _ from 'lodash'
import * as uniqid from 'uniqid'
import { ContextInterface } from '../application'
import { ControllerConfig } from '../interfaces/config.interface'
import { REQUEST, RequestContainer, IRequest } from './request.container'
import { RESPONSE, ResponseContainer, IResponse } from './response.container'

export abstract class ControllerAbstract {
    abstract index(context: ContextInterface): any
}

@injectable()
export class ControllerContainer {
    constructor(
        private readonly app: express.Express,
        private readonly container: interfaces.Container
    ) {}

    register(controllers: ControllerConfig[]) {
        const router = express.Router()
        _.map(controllers, ({ Api, Controller, TargetNamed }) => {
            decorate(injectable(), Controller)
            this.container.bind<ControllerAbstract>(TargetNamed).to(Controller)
            router.post(Api, async (req, res, next) => {
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
                const controller = new Controller()
                try {
                    const data = await controller.index(req.body)
                    res.send(data)
                } catch (err) {
                    next(err)
                } finally {
                    this.container.unbind(REQ)
                    this.container.unbind(RES)
                }
            })
        })
        this.app.use('/', router)
    }
}
