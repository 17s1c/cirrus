import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Dispatch } from '../interfaces/Dispatch';
import { Router } from '../interfaces/Router';
import { Configuration } from '../interfaces/Configuration';
import { Render } from '../interfaces/Render';

@injectable()
export class DispatchImpl implements Dispatch {
  readonly APIURL: string;

  constructor(
    @inject(Configuration) public readonly config: Configuration,
    @inject(Router) public readonly router: Router,
    @inject(Render) public readonly render: Render,
  ) {
    this.APIURL = config.get('APIURL');
  }

  async beforeStart(): Promise<any> {
    await this.router.beforeStart!();
  }

  async dispatch(req: Request, res: Response) {
    const { url = '' } = req;

    //#region API 处理
    if (url?.startsWith(this.APIURL)) {
      try {
        await this.router.dispatch(req, res);
      } catch (err) {
        // router 需要正确处理错误
        res.status(500).end('Internal server error by dispatch');
        // TODO: logger
        console.error('dispatch error', err);
      } finally {
        return true;
      }
    }
    //#endregion

    //#region 页面处理
    // FIXME: 需要判断 URL 是不是相对路径，否则有逃逸风险
    const templatePath = path.join(this.config.get('pageDir'), url);
    const accessed = await promisify(fs.access)(templatePath, fs.constants.R_OK)
      .then(() => true)
      .catch(() => false);
    if (accessed) {
      // TODO: 处理首页的情况
      try {
        const html = await this.render.render(templatePath);
        res.end(html);
      } catch (err) {
        // TODO: logger
        console.error('render error:', err);
        res.status(500).end(err.message);
      } finally {
        return true;
      }
    }
    //#endregion

    return false;
  }
}
