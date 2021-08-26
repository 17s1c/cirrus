export interface ControllerConfig {
    Api: string
    Controller: any
}

export interface ModuleConfig {
    controllers: ControllerConfig[]
    validationPipe: any
    httpExceptionFilter: any
    middleware: any[]
    service: any[]
}

export interface AppConfig {
    port: number
}
