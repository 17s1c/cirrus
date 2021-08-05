import { Container } from 'inversify';
import { Context } from './Context';

export interface Router {
  // 根据请求 Context，找到对应的处理逻辑。
  // 将解析出来的参数传递给处理逻辑，通过闭包的形式返回。
  dispatch(ctx: Context, c: Container): () => any;
}

export const Router = Symbol.for('Router');
