import { S } from 's';

export function index() {
  const req = S.request;

  const { url } = req;
  // return S.render('index.html', { url });
  return {
    url,
  };
}
// index.url = '/comments/:id';

// export function list() {
//   return {
//     code: 0,
//     data: [],
//   };
// }
// index.url = '/comments/:id';

// // name 就是参数
// export function create(name: string) {
//   // 可以直接调用校验函数校验，定义一套 rule DSL
//   const rules = [];
//   S.validate(rules, params);

//   S.

//   // 获取模型
//   const Uer = S.model.Uer;
//   const user = new Uer({ name });
//   const id = user.save();

//   // S 上面还有其他的魔术方法，这里就是 Web 开发、云产品的原语（方言）
//   // S 是 HTTP 请求级别隔离的
//   // S.render 渲染页面（模版），比如去查找 pages 目录下定义的文件
//   // S.oss 调用 OSS 云产品接口
//   // S.error 返回错误信息
//   // ...

//   return {
//     id,
//   };
// }
