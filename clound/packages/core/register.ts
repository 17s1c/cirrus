import { Express, Router } from 'express'
import {
  CONTROLLER_METADATA,
  PARAM_METADATA,
  ROUTE_METADATA,
  API_RESPONSE_METADATA
} from '../token/constants'
import { Type } from '../token/interface/common.interface'

import { RouteInterface, handlerMiddlewareFactory } from './middlewares'

function register(controllerStores: Type[], rootPath: string, app: Express) {
  const router = Router()
  controllerStores.forEach(instance => {
    const controllerMetadata: string = Reflect.getMetadata(
      CONTROLLER_METADATA,
      instance.constructor
    )
    const proto = Object.getPrototypeOf(instance)
    const routeNameArr = Object.getOwnPropertyNames(proto).filter(
      n => n !== 'constructor' && typeof proto[n] === 'function'
    )

    routeNameArr.forEach(routeName => {
      const routeMetadata: RouteInterface = Reflect.getMetadata(
        ROUTE_METADATA,
        proto[routeName]
      )
      const apiResponseParam: RouteInterface = Reflect.getMetadata(
        API_RESPONSE_METADATA,
        proto[routeName]
      )
      const { type, path } = routeMetadata
      const handler = handlerMiddlewareFactory(
        proto[routeName],
        Reflect.getMetadata(PARAM_METADATA, instance, routeName),
        apiResponseParam
      )

      router[type](controllerMetadata + path, handler)
    })
  })

  app.use(rootPath, router)
}

export default register
