import { App } from './application'

export * from './container'
export * from './exceptions'
export * from './token'
export * from './utils'
export * from './common'

export const validate = <T>(value: any, metaType: any): T =>
    App.Common.validate<T>(value, metaType)

export const getProvider = <T>(provider): T =>
    App.Provider.getProvider<T>(provider)
