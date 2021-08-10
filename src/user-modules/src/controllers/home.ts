import { inject, injectable } from 'inversify';
import { S } from '../../../s';
import { Context } from '../../../interfaces/Context';
import { Controller } from '../../../interfaces/Controller';
import { logWithId } from '../../../utils';

@injectable()
export class Home implements Controller {
  // TODO: 上下文
  // url, path, query, body, session...
  constructor(@inject(Context) public ctx: Context) {}

  // TODO: 用户如何使用数据库？
  // 可以是 Model，可以是查询连接，可以是？
  // 数据库事务怎么做？
  // @inject('mysql')
  // mysql: Mysql;

  // TODO: 用户如何打日志？（终端、日志文件或者云上的日志库）
  // 错误码如何表达
  // @inject()
  // logging: Logging;

  // TODO: 缓存服务
  // @inject()
  // cache: Cache;

  // TODO: 如何和云产品交互
  // 比如 OSS、NAS ...

  // TODO: 如何发起远程调用其他服务？
  // http、gRPC ...

  // TODO: 渲染模版
  // 比如要渲染首页，模版和数据的组装如何表达？Render 装饰器，还是 API

  // TODO: 其他 JS 缺失的功能或者 Web 开发缺失的功能
  // 比如时间格式处理
  // 校验和授权
  // 安全处理 csrf，xss ...
  // 自动缓存

  async index(url: string) {
    logWithId('home controller');

    // const { req } = this.ctx;
    const req = S.request;
    // const user = await this.mysql.query('SELECT * FROM users WHERE name = ?', [session[name]]);
    // session.set('user', user[0]);
    // this.logging.info(30000, `User ${user[0].name} logged in`);
    return {
      id: S.id,
      url,
      method: req.method,
      url2: req.url,
    };
  }
}

// @injectable()
// function main(@inject('xxx') a: string) {
//   @inject('Object')
//   const a = {};
// }

// class Main {
//   @inject('App')
//   index() {

//   }
// }
