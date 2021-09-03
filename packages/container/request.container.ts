import 'reflect-metadata'
import { injectable } from 'inversify'
import { Request } from 'express'

export const REQUEST = 'REQUEST'

export interface IRequest {
    readonly request: Request
    readonly body: any
    readonly query: any
    readonly params: any
    readonly headers: any
    readonly cookies: any
}

@injectable()
export class RequestContainer implements IRequest {
    constructor(readonly request: Request) {}

    get body(): any {
        return this.request.body
    }

    get query(): any {
        return this.request.query
    }

    get params(): any {
        return this.request.params
    }

    get headers(): any {
        return this.request.headers
    }

    get cookies(): any {
        return this.request.cookies
    }
}
