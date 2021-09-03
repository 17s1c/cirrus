import { decorate } from 'inversify'
import * as _ from 'lodash'

const __param = function(index, decorator) {
    return function(target, key) {
        decorator(target, key, index)
    }
}

export const decorateClass = (
    classDecorators: ClassDecorator[],
    target: object,
) => _.map(classDecorators, classDecorator => decorate(classDecorator, target))

export const decorateParam = (
    parameterDecorators: ParameterDecorator[],
    target: object,
    name: string,
    index: number,
) => {
    Object.defineProperty(
        target,
        name,
        Reflect.decorate(
            _.map(parameterDecorators, parameterDecorator =>
                __param(index, parameterDecorator),
            ),
            target,
            name,
            Object.getOwnPropertyDescriptor(target, name),
        ),
    )
}

export const decorateMethod = (
    methodDecorators: MethodDecorator[],
    target: object,
    name: string,
) => {
    Object.defineProperty(
        target,
        name,
        Reflect.decorate(
            methodDecorators,
            target,
            name,
            Object.getOwnPropertyDescriptor(target, name),
        ),
    )
}
