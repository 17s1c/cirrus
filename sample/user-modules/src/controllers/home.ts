import { App } from 'cirri/lib/application'
import { IController } from 'cirri/lib/container/controller.container'
import DemoService, { IDemoService } from '../service/demo.service'

export default class Home implements IController {
    async index(data) {
        const demoService = App.Provider.getProvider<IDemoService>(DemoService)
        await demoService.save(data)
        return demoService.findOne()
    }

    // Middleware(req.res){
    // 	Application.middleware
    // }
}
