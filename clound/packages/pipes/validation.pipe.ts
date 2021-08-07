import { includes } from 'lodash'
import { Type } from '../token/interface/common.interface'
import { validateAndTransform } from '../utils/validation.util'

export interface PipeInterface {
  transform(value: any, metaType: any): any
}

export class ValidationPipe implements PipeInterface {
  transform(value: any, metaType: any): Record<string, unknown> | any[] {
    if (!metaType || !this.toValidate(metaType)) {
      return value
    }
    return validateAndTransform(metaType, value, 'ValidationPipe')
  }

  private toValidate(metaType: Type<any>): boolean {
    const typesToSkip = [String, Boolean, Number, Array, Object]
    return !includes(typesToSkip, metaType)
  }
}
