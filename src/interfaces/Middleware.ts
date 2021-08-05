export interface Middleware {
    can(req: Request): number;
    request(req: Request, res: Response): any;
    response(req: Request, res: Response): any;
}

export const Middleware = Symbol.for('Middleware');
