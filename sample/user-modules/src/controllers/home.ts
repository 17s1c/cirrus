import { IController, getProvider } from '../../../../packages'
import { DemoService, IDemoService } from '../service/demo.service'

export default class Home implements IController {
    async index(data) {
        const demoService = getProvider<IDemoService>(DemoService)
        await demoService.save(data)
        return demoService.findOne()
    }

    // Middleware(req.res){
    // 	Application.middleware
    // }
}
