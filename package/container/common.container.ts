import { injectable } from 'inversify'
import { interfaces } from 'inversify/lib/interfaces/interfaces'

import LoggerService, { ILoggerService } from '../service/logger.service'

@injectable()
export class CommonContainer {
    constructor(private readonly container: interfaces.Container) {}

    register() {
        this.container.bind<ILoggerService>(LoggerService).toSelf()
    }
}
