import Home from '../user-modules/src/controllers/home'
import Demo from '../user-modules/src/controllers/demo'
import { MyHttpExceptionFilter } from '../user-modules/src/filters/httpException.filter'
import { APICallLoggerMiddleware } from '../user-modules/src/middlewares/apiCallLogger.middleware'
import { MyValidationPipe } from '../user-modules/src/pipes/validation.pipe'
import { AppConfig } from './interfaces/config.interface'

// 代码编译后自动生成文件
export const appConfig: AppConfig = {
    controllers: [
        {
            Api: '/home',
            Controller: Home,
            TargetNamed: 'home'
        },
        {
            Api: '/demo',
            Controller: Demo,
            TargetNamed: 'demo'
        }
    ],
    validationPipe: MyValidationPipe,
    httpExceptionFilter: MyHttpExceptionFilter,
    middleware: [APICallLoggerMiddleware]
}
