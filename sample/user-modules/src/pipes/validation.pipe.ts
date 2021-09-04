import * as Joi from 'Joi'
import {
    IValidationPipe,
    Validation,
    ValidationErrorException,
} from '../../../../packages'

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
