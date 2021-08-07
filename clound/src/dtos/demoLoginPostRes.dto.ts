import { Exclude, Expose } from 'class-transformer'
import { IsNumber } from 'class-validator'

@Exclude()
export class DemoLoginPostResDto {
  @Expose()
  @IsNumber()
  readonly token: number
}
