import Home from '../../user-modules/src/controllers/home'
import Demo from '../../user-modules/src/controllers/demo'
import { MyHttpExceptionFilter } from '../../user-modules/src/filters/httpException.filter'
import { APICallLoggerMiddleware } from '../../user-modules/src/middlewares/apiCallLogger.middleware'
import UserModel from '../../user-modules/src/model/user.model'
import { MyValidationPipe } from '../../user-modules/src/pipes/validation.pipe'
import DemoService from '../../user-modules/src/service/demo.service'
import { ModuleConfig } from '../interfaces/config.interface'

// 代码编译后自动生成文件
export const moduleConfig: ModuleConfig = {
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
