import { Repository } from 'typeorm'
import { InjectRepository } from '../../../package/container/repository.container'
import { Provider } from '../../../package/container/provider.container'
import UserModel from '../model/user.model'

export interface IDemoService {
    findOne()
    save(user)
}

@Provider()
export default class DemoService implements IDemoService {
    constructor(
        @InjectRepository(UserModel)
        private userRepository: Repository<UserModel>,
    ) {}

    async findOne() {
        return await this.userRepository.find()
    }

    async save(user) {
        let userModel = new UserModel()
        userModel = Object.assign(user, userModel)
        return this.userRepository.save(userModel)
    }
}
