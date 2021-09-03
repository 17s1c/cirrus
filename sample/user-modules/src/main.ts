import { App } from '../../../packages/application'
import { appModule } from './app.module'
import { config } from './config/local.config'

async function bootstrap() {
    await App.init(appModule, config)
    App.Application.listen()
}

bootstrap()
