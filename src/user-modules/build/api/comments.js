// ts 带类型生成的接口
function create {
  (name: string): { name: string };
}

// js 不带类型生成的接口
function create {
  (name: any): any;
}
