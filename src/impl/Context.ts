import { inject, injectable } from "inversify";
import { Context } from "../interfaces/Context";
import { Session } from "../interfaces/Session";

@injectable()
export class ContextImpl implements Context {
    @inject(Session)
    session!: Session;

    // set req(req: any) {
    //     this.req = req;
    // }

    // [key: string]: any;
    // session: Session;
    req: Request;
    res: Response;
}