import { ConnectionOptions } from 'typeorm'

export interface ControllerConfig {
    Api: string
    Controller: any
}

export interface ModuleConfig {
    controllers: ControllerConfig[]
    validationPipe: any
    httpExceptionFilter: any
    middleware: any[]
    providers: any[]
    model: any[]
}

export interface AppConfig {
    port: number
    dbOptions: ConnectionOptions
}
