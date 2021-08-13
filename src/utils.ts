import { asyncLocalStorage } from './s';

export function logWithId(msg: string) {
  const id = asyncLocalStorage.getStore();
  console.log(`${id !== undefined ? id : '-'}:`, msg);
}

export function jsonRpcResponse(id: string, result: any) {
  return {
    jsonrpc: '2.0',
    id,
    result,
  };
}

export function jsonRpcError(id: string, code: number, message: string) {
  return {
    jsonrpc: '2.0',
    id,
    error: {
      code,
      message,
    },
  };
}

export class Deferred<T> {
  public readonly promise: Promise<T>;

  resolve!: (data: T) => void;
  reject!: (error?: Error) => void;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
