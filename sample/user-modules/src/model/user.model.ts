import { Column, Entity } from 'typeorm'
import { BaseModel } from '../../../../packages'

@Entity('users')
export default class UserModel extends BaseModel {
    @Column()
    name: string

    @Column()
    password: string
}
