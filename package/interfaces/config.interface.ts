export interface ControllerConfig {
    Api: string
    Controller: any
}

export interface AppConfig {
    controllers: ControllerConfig[]
    validationPipe: any
    httpExceptionFilter: any
    middleware: any[]
    service: any[]
}
