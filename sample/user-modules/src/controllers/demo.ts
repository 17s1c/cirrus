import * as Joi from 'Joi'
import { validate, Controller, IController } from '../../../../packages'

import { DemoService } from '../service/demo.service'

@Controller()
export default class Demo implements IController {
    constructor(private readonly demoService: DemoService) {}

    async index(data) {
        // Application.validate(request.body, DemoLoginPostReqDto)
        const schema = {
            name: Joi.string(),
            password: Joi.number().required(),
        }
        data = validate(data, schema)
        await this.demoService.save(data)
        return this.demoService.findOne()
    }
}
