import { App } from 'cirri/lib/application'
import {
    Controller,
    IController,
} from 'cirri/lib/container/controller.container'
import * as Joi from 'Joi'

import DemoService from '../service/demo.service'

@Controller()
export default class Demo implements IController {
    constructor(private readonly demoService: DemoService) {}

    async index(data) {
        // Application.validate(request.body, DemoLoginPostReqDto)
        const schema = {
            name: Joi.string(),
            password: Joi.number().required(),
        }
        data = App.Common.validate(data, schema)
        await this.demoService.save(data)
        return this.demoService.findOne()
    }
}
