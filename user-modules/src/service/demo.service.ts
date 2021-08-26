import { Service } from '../../../package/container/service.container'
import LoggerService from '../../../package/service/logger.service'

export interface IDemoService {
    addUser(user)
    getUser()
}

@Service()
export default class DemoService implements IDemoService {
    readonly userList = []

    constructor(private readonly loggerService: LoggerService) {}

    addUser(user) {
        this.userList.push(user)
    }

    getUser() {
        return this.userList
    }
}
