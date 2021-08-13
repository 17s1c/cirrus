import ejs from 'ejs';
import { injectable } from 'inversify';
import { Render } from '../interfaces/Render';
import { Deferred } from '../utils';

@injectable()
export class RenderImpl implements Render {
  async render(templatePath: string): Promise<string> {
    // TODO: 处理没有 JS 文件的情况
    // 支持 .ts 文件，这里先简化成 js 的 commonjs
    const jsFile = templatePath.replace(/\.html$/i, '.js');

    // TODO: 在 debug 模式下，每次访问重新加载
    require.cache[jsFile] = undefined;
    const { render } = await import(jsFile);
    const state = new Deferred<string>();

    let data = render();
    if (data instanceof Promise) {
      data = await data;
    }

    // TODO: 渲染缓存处理
    ejs.renderFile(templatePath, data, (err, html) => {
      if (err) {
        state.reject(err);
      } else {
        state.resolve(html);
      }
    });

    return state.promise;
  }
}
