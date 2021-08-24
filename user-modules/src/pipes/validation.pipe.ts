import * as Joi from 'Joi'
import { ValidationErrorException } from '../../../package/exceptions/validation.exception'
import {
    IValidationPipe,
    ValidationPipeInjectable
} from '../../../package/service/validation.pipe'

@ValidationPipeInjectable()
export class MyValidationPipe implements IValidationPipe {
    transform(data: any, metaType: any): any {
        const { error, value } = Joi.validate(data, metaType, {
            allowUnknown: true,
            abortEarly: true
        })
        if (error) throw new ValidationErrorException(error)
        return value
    }
}
