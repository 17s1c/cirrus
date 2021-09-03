export class BaseException extends Error {
    status: number
    code: string
    message: string

    constructor(status: number, code: string, message: string) {
        super()
        this.status = status
        this.code = code
        this.message = message
    }
}
