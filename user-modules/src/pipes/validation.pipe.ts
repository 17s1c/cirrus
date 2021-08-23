import * as Joi from 'Joi'
import { ValidationPipeInterface } from '../../../package/container/validationPipe.container'

export class MyValidationPipe implements ValidationPipeInterface {
    transform(data: any, metaType: any): any {
        const { error, value } = Joi.validate(data, metaType, {
            allowUnknown: true,
            abortEarly: true
        })
        if (error) throw error
        return value
    }
}
