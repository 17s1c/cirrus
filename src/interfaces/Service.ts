export interface Service {
    beforeStart(): Promise<any>;
}

export const Service = Symbol.for('Service')
