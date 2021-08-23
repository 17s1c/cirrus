import { Application, ContextInterface } from '../../../package/application'
import * as Joi from 'Joi'

import { ControllerAbstract } from '../../../package/container/controller.container'
import { DemoLoginPostReqDto } from '../dtos/demoLoginPostReq.dto'

export default class extends ControllerAbstract {
    async index() {
        // const req = Application.getRequest(requestID)
        // const res = Application.getResponse(requestID)
        // // Application.validate(request.body, DemoLoginPostReqDto)
        // const schema = {
        //   name: Joi.string(),
        //   password: Joi.number().required()
        // }
        // Application.validate(req.body, schema)
        // response.send({ headers: request.headers, body: request.body })
    }

    // Middleware(req.res){
    // 	Application.middleware
    // }
}
