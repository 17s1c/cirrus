import { BaseException } from './base.exception'

export class ValidationErrorException extends BaseException {
    constructor(err = null) {
        super(400, 'ValidationErrorException', err)
    }
}
