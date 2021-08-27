import { App } from './application'
import { appConfig } from './config/app.config'

async function bootstrap() {
    const { port } = appConfig
    await App.init()
    App.Application.listen(port, () =>
        console.log(`application running on port ${port}`),
    )
}

bootstrap()
