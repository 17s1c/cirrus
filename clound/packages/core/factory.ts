import 'reflect-metadata'
import * as express from 'express'
import * as _ from 'lodash'
import * as bodyParser from 'body-parser'
import * as core from 'express-serve-static-core'
import { Type } from '../token/interface/common.interface'
import register from './register'

export class Factory {
  private constructor(private readonly app: core.Express) {}

  static create({ controllerStores }: { controllerStores: Type[] }) {
    const app = express()

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    register(
      _.map(controllerStores, controller => new controller()),
      '/',
      app
    )
    return new Factory(app)
  }

  listen(port, callback: () => any) {
    this.app.listen(port, callback)
  }
}
