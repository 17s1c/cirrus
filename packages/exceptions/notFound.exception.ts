import { BaseException } from './base.exception'

export class NotFoundErrorException extends BaseException {
    constructor(err = null) {
        super(404, 'NotFoundErrorException', err)
    }
}
