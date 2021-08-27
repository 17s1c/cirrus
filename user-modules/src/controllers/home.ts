import { Application } from '../../../package/application'

import { IController } from '../../../package/container/controller.container'
import DemoService, { IDemoService } from '../service/demo.service'

export default class Home implements IController {
    async index(data) {
        const demoService = Application.getService<IDemoService>(DemoService)
        demoService.addUser(data)
        return demoService.getUser()
    }

    // Middleware(req.res){
    // 	Application.middleware
    // }
}
