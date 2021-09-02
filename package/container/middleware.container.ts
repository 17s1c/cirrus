import * as express from 'express'
import { injectable } from 'inversify'
import { interfaces } from 'inversify/lib/interfaces/interfaces'
import * as _ from 'lodash'
import { decorateClass } from '../common/decorate.util'
import { Type } from '../token/interface/common.interface'

export interface Options {
    global?: boolean
    api?: string[]
}

export interface Value {
    options: Options
    middleware: Type<IMiddleware>
}

export interface MiddlewareMap {
    clear(): void
    delete(key: Type<IMiddleware>): boolean
    forEach(
        callbackfn: (
            value: Value,
            key: Type<IMiddleware>,
            map: Map<Type<IMiddleware>, Value>,
        ) => void,
        thisArg?: any,
    ): void
    get(key: Type<IMiddleware>): Value | undefined
    has(key: Type<IMiddleware>): boolean
    set(key: Type<IMiddleware>, value: Value): this
    readonly size: number
}

export interface IMiddleware<TRequest = any, TResponse = any> {
    use(req: TRequest, res: TResponse, next: () => void): any
}

export const MIDDLEWARE_METADATA = 'MIDDLEWARE_METADATA'

export const MIDDLEWARE = Symbol.for('MIDDLEWARE')

export function Middleware(options: Options): ClassDecorator {
    return (target: object) => {
        decorateClass([injectable()], target)
        Reflect.defineMetadata(MIDDLEWARE_METADATA, options, target)
    }
}

@injectable()
export class MiddlewareContainer {
    readonly middlewareMap: MiddlewareMap = new Map()

    readonly globalMiddlewareMap: MiddlewareMap = new Map()

    constructor(
        private readonly app: express.Express,
        private readonly container: interfaces.Container,
    ) {}

    register(middlewareList: Type<IMiddleware>[]) {
        _.map(middlewareList, middleware => {
            const options: Options = Reflect.getMetadata(
                MIDDLEWARE_METADATA,
                middleware,
            )
            this.container.bind(middleware as any).toSelf()
            this.middlewareMap.set(middleware, { middleware, options })
            if (options && options.global) {
                this.globalMiddlewareMap.set(middleware, {
                    middleware,
                    options,
                })
                const globalMiddleware = this.container.get<IMiddleware>(
                    middleware as any,
                )
                this.app.use((req, res, next) =>
                    globalMiddleware.use(req, res, next),
                )
            } else if (options && !_.isEmpty(options.api)) {
                const _middleware = this.container.get<IMiddleware>(
                    middleware as any,
                )
                _.map(options.api, api =>
                    this.app.use(api, (req, res, next) =>
                        _middleware.use(req, res, next),
                    ),
                )
            }
        })
    }
}
