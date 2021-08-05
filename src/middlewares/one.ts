import { injectable } from "inversify";
import { Middleware } from "../interfaces/Middleware";

@injectable()
export class one implements Middleware {
    can(req: any): number {
        throw new Error("Method not implemented.");
    }
    request(req: any, res: any) {
        throw new Error("Method not implemented.");
    }
    response(req: any, res: any) {
        throw new Error("Method not implemented.");
    }
}