import { Exclude, Expose } from 'class-transformer'
import { IsNumber, IsString } from 'class-validator'

@Exclude()
export class DemoLoginPostReqDto {
    @Expose()
    @IsString()
    readonly name: string

    @Expose()
    @IsNumber()
    readonly password: number
}
