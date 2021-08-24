import { IValidationPipe } from '../service/validation.pipe'
import { IExceptionFilter } from '../service/httpException.filter'

export interface ControllerConfig {
    Api: string
    Controller: any
    TargetNamed: any
}

export interface AppConfig {
    controllers: ControllerConfig[]
    validationPipe: any
    httpExceptionFilter: any
    middleware: any[]
}
