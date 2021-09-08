import { validate, Controller, IController } from '../../../../packages'
import { DemoLoginPostReqDto } from '../dtos/demoLoginPostReq.dto'

import { DemoService } from '../service/demo.service'

@Controller()
export default class Demo implements IController {
    constructor(private readonly demoService: DemoService) {}

    async index(data) {
        data = validate(data, DemoLoginPostReqDto)
        await this.demoService.save(data)
        return this.demoService.findOne()
    }
}
