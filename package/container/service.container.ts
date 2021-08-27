import { decorate, injectable } from 'inversify'
import { interfaces } from 'inversify/lib/interfaces/interfaces'
import * as _ from 'lodash'

export const SERVICE_METADATA = 'SERVICE_METADATA'

export function Service(options?: any): ClassDecorator {
    return (target: object) => {
        decorate(injectable(), target)
        Reflect.defineMetadata(SERVICE_METADATA, options, target)
    }
}

@injectable()
export class ServiceContainer {
    constructor(private readonly container: interfaces.Container) {}

    register(serviceList: any[]) {
        _.map(serviceList, service => {
            this.container.bind(service).toSelf()
        })
    }
}
