import { Type } from '../token/interface/common.interface'
import { HttpMethod, Param, Parse } from '../core/middlewares'
import {
  API_RESPONSE_METADATA,
  CONTROLLER_METADATA,
  PARAM_METADATA,
  PARAM_TYPE_METADATA,
  PARSE_METADATA,
  ROUTE_METADATA
} from '../token/constants'

export interface ApiResponseInPut {
  status?: number
  type?: Type<unknown> | Function | [Function] | string
  isArray?: boolean
  description?: string
}

export function Controller(path = ''): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(CONTROLLER_METADATA, path, target)
  }
}

export function ApiResponse(param: ApiResponseInPut): MethodDecorator {
  return (target: object, name: string, descriptor: any) => {
    Reflect.defineMetadata(API_RESPONSE_METADATA, param, descriptor.value)
  }
}

export function createMethodDecorator(method: HttpMethod = 'get') {
  return (path = '/'): MethodDecorator => (
    target: object,
    name: string,
    descriptor: any
  ) => {
    Reflect.defineMetadata(
      ROUTE_METADATA,
      { type: method, path },
      descriptor.value
    )
  }
}

export function createParamDecorator(paramType: Param) {
  return (key?: string): ParameterDecorator => (
    target: object,
    name: string,
    index: number
  ) => {
    const typeList = Reflect.getMetadata(PARAM_TYPE_METADATA, target, name)
    const preMetadata = Reflect.getMetadata(PARAM_METADATA, target, name) || []
    const newMetadata = [
      { key, index, paramType, type: typeList?.[index] },
      ...preMetadata
    ]
    Reflect.defineMetadata(PARAM_METADATA, newMetadata, target, name)
  }
}

export function Parse(type: Parse): ParameterDecorator {
  return (target: object, name: string, index: number) => {
    const preMetadata = Reflect.getMetadata(PARAM_METADATA, target, name) || []
    const newMetadata = [{ type, index }, ...preMetadata]
    Reflect.defineMetadata(PARSE_METADATA, newMetadata, target, name)
  }
}

export const Get = createMethodDecorator('get')
export const Post = createMethodDecorator('post')
export const Body = createParamDecorator('body')
export const Headers = createParamDecorator('headers')
export const Cookies = createParamDecorator('cookies')
export const Query = createParamDecorator('query')
