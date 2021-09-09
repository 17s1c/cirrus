import { AppConfig } from '../../../../packages'

export const config: AppConfig = {
    port: Number(process.env.PORT),
    dbOptions: {
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DBNAME,
        logging: true,
        synchronize: true,
    },
}
