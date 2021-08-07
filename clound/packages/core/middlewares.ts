import { Request, Response, NextFunction } from 'express'
import { ApiResponseInPut } from '../decorators/decorators'
import { ValidationPipe } from '../pipes/validation.pipe'
import * as _ from 'lodash'

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'
export type Param = 'params' | 'query' | 'body' | 'headers' | 'cookies'
export type Parse = 'number' | 'string' | 'boolean'

export interface ControllerType {
  path: string
  target: object
}

export interface RouteInterface {
  target: object
  name: string
  type: HttpMethod
  path: string
  func: (...args: any[]) => any
  loaded?: boolean
}

export interface ParamInterface {
  key: string
  index: number
  paramType: Param
  type: any
  name: string
}

const validationPipe = new ValidationPipe()

export function handlerMiddlewareFactory(
  func: (...args: any[]) => any,
  paramList: ParamInterface[],
  apiResponseParam: ApiResponseInPut
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      validationRequestPipe(req, res, next, paramList)
      const args = extractParametersPipe(req, res, next, paramList)
      let result = await func(...args)
      if (apiResponseParam) {
        result = validationResponseInterceptor({
          value: result,
          metaType: apiResponseParam.type,
          isArray: apiResponseParam.isArray
        })
      }
      res.send(result)
    } catch (err) {
      console.error(err)
      res.status(err?.status || 500)
      res.send({
        code: err?.code,
        error: err?.message
      })
    }
  }
}

export function extractParametersPipe(
  req: Request,
  res: Response,
  next: NextFunction,
  paramArr: ParamInterface[] = []
) {
  if (!paramArr.length) return [req, res, next]

  const args = []

  paramArr.forEach(param => {
    const { key, index, paramType, type } = param
    switch (paramType) {
      case 'query':
        args[index] = key ? req.query[key] : req.query
        break
      case 'body':
        args[index] = key ? req.body[key] : req.body
        break
      case 'params':
        args[index] = key ? req.params[key] : req.params
        break
      case 'headers':
        args[index] = key ? req.headers[key.toLowerCase()] : req.headers
        break
      case 'cookies':
        args[index] = key ? req.cookies[key] : req.cookies
        break
      default:
        args[index] = res
        break
    }
  })

  args.push(req, res, next)
  return args
}

export function validationRequestPipe(
  req: Request,
  res: Response,
  next: NextFunction,
  paramArr: ParamInterface[] = []
) {
  _.forEach(paramArr, param => {
    const { key, paramType, type } = param
    if (key) {
      const data = req[paramType][key]
      req[paramType][key] = validationPipe.transform(data, type)
    } else {
      const data = req[paramType]
      req[paramType] = validationPipe.transform(data, type)
    }
  })
}

export function validationResponseInterceptor({
  value,
  metaType,
  isArray
}: {
  value: any
  metaType: any
  isArray: boolean
}) {
  if (isArray) {
    return _.map(value, data => validationPipe.transform(data, metaType))
  } else {
    return validationPipe.transform(value, metaType)
  }
}
