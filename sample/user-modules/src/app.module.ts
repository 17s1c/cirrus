import { AppModule } from 'cirri/lib/interfaces/config.interface'
import Home from './controllers/home'
import Demo from './controllers/demo'
import { MyHttpExceptionFilter } from './filters/httpException.filter'
import { APICallLoggerMiddleware } from './middlewares/apiCallLogger.middleware'
import UserModel from './model/user.model'
import { MyValidationPipe } from './pipes/validation.pipe'
import DemoService from './service/demo.service'

export const appModule: AppModule = {
    controllers: [
        {
            Api: '/home',
            Controller: Home,
        },
        {
            Api: '/demo',
            Controller: Demo,
        },
    ],
    validationPipe: MyValidationPipe,
    httpExceptionFilter: MyHttpExceptionFilter,
    middleware: [APICallLoggerMiddleware],
    providers: [DemoService],
    model: [UserModel],
}
