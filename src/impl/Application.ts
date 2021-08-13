import path from 'path';
import express from 'express';
import { inject, injectable } from 'inversify';
import { id, local, asyncLocalStorage } from '../s';
import { logWithId } from '../utils';
import { Application } from '../interfaces/Application';
import { Dispatch } from '../interfaces/Dispatch';
import { Configuration } from '../interfaces/Configuration';

@injectable()
export class ApplicationImpl implements Application {
  constructor(
    @inject(Configuration) public readonly config: Configuration,
    @inject(Dispatch) public readonly dispatcher: Dispatch,
  ) {}

  async start() {
    // 在服务启动前，运行服务的前置函数
    this.dispatcher.beforeStart!();

    // 创建服务器
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // TOOD: 通过计算或者配置得到 public 路径
    app.use('/public', express.static(path.join(__dirname, '..', 'user-modules', 'public')));

    app.use((req, res, next) => {
      asyncLocalStorage.run(id(), () => {
        const id = asyncLocalStorage.getStore() as number;
        logWithId('start');
        local.set(id, {
          request: req,
          response: res,
        });

        function clean() {
          local.delete(id);
          logWithId('exit' + JSON.stringify(local));
        }

        this.dispatcher.dispatch(req, res).then(done => {
          if (!done) {
            // TODO: next 做完，调 clean？
            next();
          }

          clean();
        });
      });
    });

    const port = this.config.get('port');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  }
}
