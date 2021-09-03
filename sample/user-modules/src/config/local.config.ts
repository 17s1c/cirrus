import { AppConfig } from '../../../../packages'

export const config: AppConfig = {
    port: 8080,
    dbOptions: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '12345678',
        database: 'demo',
        logging: true,
        synchronize: true,
    },
}
