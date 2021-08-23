import * as express from 'express'
import { decorate, injectable } from 'inversify'
import { interfaces } from 'inversify/lib/interfaces/interfaces'
import * as _ from 'lodash'

export interface Options {
    global: boolean
    api?: string[]
}

export interface Value {
    options: Options
    middleware: MiddlewareInterface
}

export interface MiddlewareMap {
    clear(): void
    delete(key: MiddlewareInterface): boolean
    forEach(
        callbackfn: (
            value: Value,
            key: MiddlewareInterface,
            map: Map<MiddlewareInterface, Value>
        ) => void,
        thisArg?: any
    ): void
    get(key: MiddlewareInterface): Value | undefined
    has(key: MiddlewareInterface): boolean
    set(key: MiddlewareInterface, value: Value): this
    readonly size: number
}

export interface MiddlewareInterface<TRequest = any, TResponse = any> {
    use(req: TRequest, res: TResponse, next: () => void): any
}

export const MIDDLEWARE_METADATA = 'MIDDLEWARE_METADATA'

export const MIDDLEWARE = Symbol.for('Middleware')

export function MiddlewareInjectable(options: Options): ClassDecorator {
    return (target: object) => {
        decorate(injectable(), target)
        Reflect.defineMetadata(MIDDLEWARE_METADATA, options, target)
    }
}

@injectable()
export class MiddlewareContainer {
    readonly middlewareMap: MiddlewareMap = new Map()

    readonly globalMiddlewareMap: MiddlewareMap = new Map()

    constructor(
        private readonly app: express.Express,
        private readonly container: interfaces.Container
    ) {}

    register(middlewareList: MiddlewareInterface[]) {
        _.map(middlewareList, middleware => {
            const options: Options = Reflect.getMetadata(
                MIDDLEWARE_METADATA,
                middleware
            )
            this.container.bind(middleware as any).toSelf()
            this.middlewareMap.set(middleware, { middleware, options })
            if (options && options.global)
                this.globalMiddlewareMap.set(middleware, {
                    middleware,
                    options
                })
        })

        const router = express.Router()
        const globalMiddlewareMap = this.globalMiddlewareMap
        globalMiddlewareMap.forEach(({ middleware: GlobalMiddleware }) => {
            // @ts-ignore
            const globalMiddleware = this.container.get<GlobalMiddleware>(
                GlobalMiddleware as any
            )
            this.app.use((req, res, next) =>
                globalMiddleware.use(req, res, next)
            )
        })
        this.app.use('/', router)
    }
}
