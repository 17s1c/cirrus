export interface Session {
    get(key: string): any;
    set(key: string, value: any): void;
}

export const Session = Symbol.for('Session')