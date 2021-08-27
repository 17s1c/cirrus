import { injectable } from 'inversify'
import * as pino from 'pino'

export interface ILoggerService {
    audit(payload)
    info(payload)
    debug(payload)
    warn(payload)
    error(payload)
}

@injectable()
export default class LoggerService implements ILoggerService {
    private readonly logger: pino.Logger

    constructor(logLevel = 'info') {
        this.logger = pino({
            prettyPrint: true,
            level: logLevel,
            customLevels: {
                audit: 35,
            },
        })
    }

    audit(payload) {
        this.logger.audit(payload)
    }

    info(payload) {
        this.logger.audit(payload)
    }

    debug(payload) {
        this.logger.debug(payload)
    }

    warn(payload) {
        this.logger.warn(payload)
    }

    error(payload) {
        this.logger.error(payload)
    }
}
