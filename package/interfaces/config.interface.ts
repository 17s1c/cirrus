export interface ControllerConfig {
    Api: string
    Controller: any
    TargetNamed: any
}

export interface AppConfig {
    controllers: ControllerConfig[]
    validationPipe: any
    middleware: any[]
}
