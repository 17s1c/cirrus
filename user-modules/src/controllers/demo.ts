import { Application, ContextInterface } from '../../../package/application'
import * as Joi from 'Joi'

import { ControllerAbstract } from '../../../package/container/controller.container'

export default class extends ControllerAbstract {
    async index(data) {
        // Application.validate(request.body, DemoLoginPostReqDto)
        const schema = {
            name: Joi.string(),
            password: Joi.number().required()
        }
        Application.validate(data, schema)
        return data
    }
}
