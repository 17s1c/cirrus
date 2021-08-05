import { injectable } from "inversify";
import { Session } from "../interfaces/Session";

@injectable()
export class SessionImpl implements Session {
    get(key: string) {
        throw new Error("Method not implemented.");
    }
    set(key: string, value: any): void {
        throw new Error("Method not implemented.");
    }
}