declare interface RPCClientOption {
  endpoint: string;
}

declare interface ListParams {
  pageSize: number;
}

declare interface UserData {
  id: string;
  name: string;
}

declare var client: {
  version: string;
  user: {
    list(params: ListParams): Promise<any>;
    create(name: string): Promise<UserData>;
  };
  comments: {
    index(addr: string): Promise<any>;
  };
};

declare function RPCClient(option: RPCClientOption): typeof client;

export default RPCClient;
