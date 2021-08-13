import path from 'path';
import express from 'express';
import { id, local, asyncLocalStorage } from '../s';
import { container } from '../inversify.config';
import { Configuration } from '../interfaces/Configuration';
import { Dispatch } from '../interfaces/Dispatch';
import { logWithId } from '../utils';

const config = container.get<Configuration>(Configuration);
const dispatcher = container.get<Dispatch>(Dispatch);

// 在服务启动前，运行服务的前置函数
dispatcher.beforeStart!();

// // 调用所有的中间件
// const middlewares = container.getAll(Middleware);
// const composed = compose(middlewares);

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

    dispatcher.dispatch(req, res).then(done => {
      if (!done) {
        // TODO: next 做完，调 clean？
        next();
      }

      clean();
    });
  });
});

const port = config.get('port');
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
