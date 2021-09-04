import { injectable } from "inversify";
import { Configuration } from "../interfaces/Configuration";

@injectable()
export class ConfigurationImpl implements Configuration {
    private config: {
        [key: string]: any
     } = {
        port: 5000,
    }

    get<T>(key: string): T {
        return this.config[key];
    }

    set<T>(key: string, value: T): void {
        throw new Error("Method not implemented.");
    }
}