import { App } from '../../../packages/application'
import { config } from './config/config'
import Demo from './controllers/demo'
import Home from './controllers/home'
import { MyHttpExceptionFilter } from './filters/httpException.filter'
import { APICallLoggerMiddleware } from './middlewares/apiCallLogger.middleware'
import UserModel from './model/user.model'
import { DemoService } from './service/demo.service'

App.init(
    {
        controllers: [Home, Demo],
        validationPipe: null,
        httpExceptionFilter: MyHttpExceptionFilter,
        middleware: [APICallLoggerMiddleware],
        providers: [DemoService],
        enableCors: true,
        model: [UserModel],
    },
    config,
).catch(err => console.error(err))
