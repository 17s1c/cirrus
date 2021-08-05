import { inject, injectable } from 'inversify';
import { Context } from '../../interfaces/Context';
import { Controller } from '../../interfaces/Controller';

@injectable()
export class Home implements Controller {
  constructor(@inject(Context) public ctx: Context) {}

  // @inject('mysql')
  // mysql: Mysql;

  // @inject()
  // logging: Logging;

  async index(url: string) {
    const { req } = this.ctx;
    // const user = await this.mysql.query('SELECT * FROM users WHERE name = ?', [session[name]]);
    // session.set('user', user[0]);
    // this.logging.info(30000, `User ${user[0].name} logged in`);
    return {
      url,
      method: req.method,
    };
  }
}
