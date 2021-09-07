import 'reflect-metadata'
import { Controller, CONTROLLER_METADATA } from '../../container'
import { decorateClass } from '../decorate.util'

describe('decorateClass', () => {
    class Test {}
    it('should decorate to class', () => {
        decorateClass([Controller({ key: 'value' })], Test)
        const types = Reflect.getMetadata(CONTROLLER_METADATA, Test)
        expect(types).toEqual({ key: 'value' })
    })
})
