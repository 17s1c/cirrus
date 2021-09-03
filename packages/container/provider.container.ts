import { injectable } from 'inversify'
import { interfaces } from 'inversify/lib/interfaces/interfaces'
import * as _ from 'lodash'
import { decorateClass } from '../utils'

export const PROVIDER_METADATA = 'PROVIDER_METADATA'

export function Provider(options?: any): ClassDecorator {
    return (target: object) => {
        decorateClass([injectable()], target)
        Reflect.defineMetadata(PROVIDER_METADATA, options, target)
    }
}

@injectable()
export class ProviderContainer {
    constructor(private readonly container: interfaces.Container) {}

    register(serviceList: any[]) {
        _.map(serviceList, service => {
            this.container.bind(service).toSelf()
        })
    }

    getProvider<T>(service: any): T {
        return this.container.get(service)
    }
}
