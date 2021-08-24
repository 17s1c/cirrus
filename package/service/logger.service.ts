import { injectable } from 'inversify'
import * as pino from 'pino'

export interface ILoggerService {
    auditLog(payload)
    infoLog(payload)
    debugLog(payload)
    warnLog(payload)
    errorLog(payload)
}

@injectable()
export default class LoggerService implements ILoggerService {
    private readonly logger: pino.Logger

    constructor(logLevel = 'info') {
        this.logger = pino({
            prettyPrint: true,
            level: logLevel,
            customLevels: {
                audit: 35
            }
        })
    }

    auditLog(payload) {
        this.logger.audit(payload)
    }

    infoLog(payload) {
        this.logger.audit(payload)
    }

    debugLog(payload) {
        this.logger.debug(payload)
    }

    warnLog(payload) {
        this.logger.warn(payload)
    }

    errorLog(payload) {
        this.logger.error(payload)
    }
}
