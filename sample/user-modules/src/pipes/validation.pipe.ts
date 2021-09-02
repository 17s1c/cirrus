import { IValidationPipe, Validation } from 'cirri/lib/common/validation.pipe'
import { ValidationErrorException } from 'cirri/lib/exceptions/validation.exception'
import * as Joi from 'Joi'

@Validation()
export class MyValidationPipe implements IValidationPipe {
    transform(data: any, metaType: any): any {
        const { error, value } = Joi.validate(data, metaType, {
            allowUnknown: true,
            abortEarly: true,
        })
        if (error) throw new ValidationErrorException(error)
        return value
    }
}
