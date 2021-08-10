import { asyncLocalStorage } from './s';

export function logWithId(msg: string) {
  const id = asyncLocalStorage.getStore();
  console.log(`${id !== undefined ? id : '-'}:`, msg);
}
