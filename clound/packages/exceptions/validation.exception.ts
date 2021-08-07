import { BaseException } from './BaseException'

export class ValidationErrorException extends BaseException {
  constructor(err = null) {
    super(400, 'ValidationErrorException', err)
  }
}
