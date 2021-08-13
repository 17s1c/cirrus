import RPCClient from './lib/rpc-client.js';

const client = RPCClient({ endpoint: '/api' });
console.log('client:', client.version);

export const { user, comments } = client;
