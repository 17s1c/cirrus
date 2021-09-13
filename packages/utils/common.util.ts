import * as _ from 'lodash'
import { IController } from '../container'
import { Type } from '../token'

export const generateRouterPath = (controller: Type<IController>): string =>
    _.chain(`/${controller.name}`)
        .toLower()
        .value()
