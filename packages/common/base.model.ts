import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm'
import { PrimaryColumn } from 'typeorm'
import { Generated } from 'typeorm'

export class BaseModel {
    @PrimaryColumn('integer')
    @Generated()
    id: number

    @Column()
    @Generated('uuid')
    uuid: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @VersionColumn()
    version: Date
}
