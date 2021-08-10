import http from 'http';
import { id, local, asyncLocalStorage } from '../s';
import { Container } from 'inversify';
import { Context } from '../interfaces/Context';
import { Configuration } from '../interfaces/Configuration';
import { Router } from '../interfaces/Router';
import { container } from '../inversify.config';
import { logWithId } from '../utils';

const config = container.get<Configuration>(Configuration);
const router = container.get<Router>(Router);

// // 调用所有的中间件
// const middlewares = container.getAll(Middleware);
// const composed = compose(middlewares);

const server = http.createServer((req, res) => {
  // 构造上下文 Context
  const context: Context = {
    req,
    res,
  };
  const newContainer = new Container();
  newContainer.parent = container;
  newContainer.bind(Context).toConstantValue(context);
  const fn = router.dispatch(context, newContainer);

  asyncLocalStorage.run(id(), () => {
    const id = asyncLocalStorage.getStore() as number;

    logWithId('start');

    local[id] = {
      request: req,
      response: res,
    };

    try {
      const result = fn();
      if (result instanceof Promise) {
        result
          .then(data => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
          })
          .catch(err => {
            throw err;
          });
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      }
    } catch (err) {
      res.end('HTTP/1.1 500 Internal Error');
      console.error(err);
    } finally {
      local[id] = undefined;
      logWithId('exit' + JSON.stringify(local));
    }
  });

  // try {
  //   composed(router.dispatch(context));
  // } catch (err) {
  //   // do something
  // }
});

server.on('clientError', (err: Error, socket) => {
  socket.end('HTTP/1.1 400 Bad Request');
  console.error(err);
});

server.listen(config.get('port'), () => {
  console.log(`Server running at http://localhost:${config.get('port')}/`);
});
