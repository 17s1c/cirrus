import { Application } from './application'

async function bootstrap() {
    const port = 8080
    Application.listen(port, () =>
        console.log(`application running on port ${port}`)
    )
}

bootstrap()
