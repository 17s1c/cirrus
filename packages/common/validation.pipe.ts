import { injectable } from 'inversify'
import { includes } from 'lodash'
import { Type } from '../token'
import { decorateClass, validateAndTransform } from '../utils'

export const VALIDATION_PIPE_METADATA = 'VALIDATION_PIPE_METADATA'

export const VALIDATION_PIPE = Symbol.for('VALIDATION_PIPE')

export interface IValidationPipe {
    transform(value: any, metaType: any): any
}

export function Validation(options?: any): ClassDecorator {
    return (target: object) => {
        decorateClass([injectable()], target)
        Reflect.defineMetadata(VALIDATION_PIPE_METADATA, options, target)
    }
}

@injectable()
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
