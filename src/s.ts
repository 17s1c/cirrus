import { AsyncLocalStorage } from 'async_hooks';
import { IncomingMessage, ServerResponse } from 'http';

export const asyncLocalStorage = new AsyncLocalStorage<number>();
export const local = new Map<number, any>();

let idSeq = 0;
export function id() {
  return ++idSeq;
}

export interface IS {
  // render(name: string, data: any): string;
  id: number;
  request: IncomingMessage;
  response: ServerResponse;
}

const target = {} as IS;
export const S = new Proxy(target, {
  get<T>(target: any, name: string): T {
    const id = asyncLocalStorage.getStore() as number;
    if (name === 'id') {
      return id as any;
    }
    if (!local.has(id)) {
      throw new TypeError(`No local data for id ${id}`);
    }

    return local.get(id)[name];
  },
});
