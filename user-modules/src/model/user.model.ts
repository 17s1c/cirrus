import { Column, Entity } from 'typeorm'
import BaseModel from '../../../package/common/base.model'

@Entity('users')
export default class UserModel extends BaseModel {
    @Column()
    name: string

    @Column()
    password: string
}
