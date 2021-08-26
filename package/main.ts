import { Application } from './application'
import { appConfig } from './config/app.config'

async function bootstrap() {
    const { port } = appConfig
    Application.listen(port, () =>
        console.log(`application running on port ${port}`),
    )
}

bootstrap()
