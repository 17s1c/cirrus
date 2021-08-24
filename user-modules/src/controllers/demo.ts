import { Application } from '../../../package/application'
import * as Joi from 'Joi'

import { ControllerInjectable, IController } from '../../../package/container/controller.container';
import DemoService from '../service/demo.service'

@ControllerInjectable()
export default class Demo implements IController {
    constructor(private readonly demoService: DemoService) {}

    async index(data) {
        // Application.validate(request.body, DemoLoginPostReqDto)
        const schema = {
            name: Joi.string(),
            password: Joi.number().required()
        }
        data = Application.validate(data, schema)
        this.demoService.addUser(data)
        return this.demoService.getUser()
    }
}