import {
  ApiResponse,
  Body,
  Headers,
  Controller,
  Post
} from '../../packages/decorators/decorators'
import { DemoLoginPostReqDto } from '../dtos/demoLoginPostReq.dto'
import { DemoLoginPostResDto } from '../dtos/demoLoginPostRes.dto'

@Controller('/demo')
export default class DemoController {
  @ApiResponse({
    status: 200,
    type: DemoLoginPostResDto
  })
  @Post('/login')
  login(@Body() body: DemoLoginPostReqDto) {
    return { token: '111' }
  }

  @Post('/test')
  demo(@Body() body: DemoLoginPostReqDto) {
    return { token: 'bbb' }
  }

  @Post('/test1')
  demo1(@Body('password') password: number, @Headers() header: any) {
    return { password, header }
  }
}
