import path from 'path';
import { Container } from 'inversify';
import express from 'express';
import { id, local, asyncLocalStorage } from '../s';
import { Context } from '../interfaces/Context';
import { Configuration } from '../interfaces/Configuration';
import { Router } from '../interfaces/Router';
import { container } from '../inversify.config';
import { jsonRpcError, logWithId } from '../utils';

const config = container.get<Configuration>(Configuration);
const router = container.get<Router>(Router);

// 在服务启动前，运行服务的前置函数
router.beforeStart!();

// // 调用所有的中间件
// const middlewares = container.getAll(Middleware);
// const composed = compose(middlewares);

// 创建服务器
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TOOD: 通过计算或者配置得到 public 路径
app.use('/public', express.static(path.join(__dirname, '..', 'user-modules', 'public')));

// 处理 API 的请求
app.post('/api', (req, res, next) => {
  asyncLocalStorage.run(id(), () => {
    const id = asyncLocalStorage.getStore() as number;
    logWithId('start');
    local.set(id, {
      request: req,
      response: res,
    });

    // 构造上下文 Context
    const context: Context = {
      req,
      res,
    };
    const newContainer = new Container();
    newContainer.parent = container;
    newContainer.bind(Context).toConstantValue(context);
    const fn = router.dispatch(context, newContainer);

    try {
      const result = fn();
      if (result instanceof Promise) {
        result
          .then(data => {
            res.json(data);
          })
          .catch(err => {
            throw err;
          });
      } else {
        res.json(result);
      }
    } catch (err) {
      res.end('HTTP/1.1 500 Internal Error');

      // TODO: logger
      console.error(err);
    } finally {
      local.delete(id);
      logWithId('exit' + JSON.stringify(local));
    }
  });
});

const port = config.get('port');
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
