import 'reflect-metadata'
import { injectable } from 'inversify'
import { Response } from 'express'

export const RESPONSE = 'RESPONSE'

export interface IResponse {
    readonly response: Response
    status(status: number): any
    send(result: any): any
}

@injectable()
export class ResponseContainer implements IResponse {
    constructor(readonly response: Response) {}

    status(status: number): any {
        return this.response.status(status)
    }

    send(result: any): any {
        return this.response.send(result)
    }
}
