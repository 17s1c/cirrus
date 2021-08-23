import { injectable } from 'inversify'
import { includes } from 'lodash'
import { Type } from '../token/interface/common.interface'
import { validateAndTransform } from '../utils/validation.util'

export const validationPipe = Symbol.for('validationPipe')

export interface ValidationPipeInterface {
    transform(value: any, metaType: any): any
}

@injectable()
export class ValidationPipe implements ValidationPipeInterface {
    transform(value: any, metaType: any): Record<string, unknown> | any[] {
        if (!metaType || !ValidationPipe.toValidate(metaType)) {
            return value
        }
        return validateAndTransform(metaType, value, 'ValidationPipe')
    }

    private static toValidate(metaType: Type<any>): boolean {
        const typesToSkip = [String, Boolean, Number, Array, Object]
        return !includes(typesToSkip, metaType)
    }
}
