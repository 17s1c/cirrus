import { Factory } from '../packages/core/factory'
import DemoController from './controllers/demo.controller'

async function bootstrap() {
  const port = 8080
  const app = Factory.create({
    controllerStores: [DemoController]
  })

  await app.listen(port, () =>
    console.log(`application running on port ${port}`)
  )
}

bootstrap()
