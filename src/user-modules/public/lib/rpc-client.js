let idSeq = 0;
function id() {
  idSeq = idSeq + 1;
  const timestamp = Date.now();
  const number = Math.random();
  return `${number.toString(32).slice(2)}:${timestamp}:${idSeq}`;
}

function createProxy(endpoint, target = {}) {
  const proxy = new Proxy(target, {
    get(obj, p) {
      if (p in obj) {
        return obj[p];
      }

      // console.log("p", p, "receiver:", receiver);
      return async (...args) => {
        return axios
          .post(endpoint, {
            id: id(),
            jsonrpc: '2.0',
            method: `${obj.name}.${p}`,
            params: args,
          })
          .then(res => {
            const {
              data: { error, result },
            } = res;
            if (error) {
              throw new Error(error.message);
            }
            return result;
          });
      };
    },
  });

  return proxy;
}

export default function RPCClient(option = {}) {
  const { endpoint } = option;

  return {
    version: '1.0.0',
    user: createProxy(endpoint, { name: 'user' }),
    comments: createProxy(endpoint, { name: 'comments' }),
  };
}
