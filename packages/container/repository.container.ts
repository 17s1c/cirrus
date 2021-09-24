import { injectable, LazyServiceIdentifer, inject } from 'inversify'
import { interfaces } from 'inversify/lib/interfaces/interfaces'
import * as _ from 'lodash'
import { ConnectionOptions, createConnection } from 'typeorm'
import { Repository } from 'typeorm'
import { Type } from '../token'
import { decorateParam } from '../utils'

export function InjectModel(model: Type): ParameterDecorator {
    return (target: object, name: string, index: number) => {
        decorateParam(
            [inject(new LazyServiceIdentifer(() => model?.name))],
            target,
            name,
            index,
        )
    }
}

@injectable()
export class RepositoryContainer {
    constructor(
        private readonly container: interfaces.Container,
        private dbOptions: ConnectionOptions,
    ) {}

    async register(models: any[]) {
        if (_.isEmpty(models)) return
        const connection = await createConnection(this.dbOptions)
        _.each(models, model => {
            const modelRepository = connection.getRepository(model)
            this.container
                .bind<Repository<any>>(model?.name)
                .toDynamicValue(() => {
                    return modelRepository
                })
        })
    }
}
