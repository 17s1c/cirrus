// import { inject, injectable } from "inversify";
// import { Configuration } from "../../interfaces/Configuration";
// import { Service } from "../../interfaces/Service";

// @injectable()
// export class Mysql implements Service {
//     constructor(@inject() config: Configuration) {
        
//     }

//     async beforeStart() {
//         await connect(this.config);
//     }

//     query(sql: string, params: any[]): Promise<any> {}
    
//     // ORM
//     // ....
// }