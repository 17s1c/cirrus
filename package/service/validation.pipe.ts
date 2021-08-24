import { decorate, injectable } from 'inversify'
import { includes } from 'lodash'
import { Type } from '../token/interface/common.interface'
import { validateAndTransform } from '../utils/validation.util'

export const VALIDATION_PIPE_METADATA = 'VALIDATION_PIPE_METADATA'

export const VALIDATION_PIPE = Symbol.for('VALIDATION_PIPE')

export interface IValidationPipe {
    transform(value: any, metaType: any): any
}

export function ValidationPipeInjectable(options?: any): ClassDecorator {
    return (target: object) => {
        decorate(injectable(), target)
        Reflect.defineMetadata(VALIDATION_PIPE_METADATA, options, target)
    }
}

export class ValidationPipe implements IValidationPipe {
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
