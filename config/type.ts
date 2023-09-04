import { AppType } from './enums/AppType.enum';
import { Env } from './enums/Env.enum';
import { BuildType } from './enums/BuildType.enum';

export interface CommandParams {
  env: Env;
  type: AppType;
  all?: boolean; // 是否全量打包 还是只打包本工程
  pull?: boolean; // 是否拉取分包 参数
  buildType?: BuildType; // 打包类型
  moveDir?: string; // 针对打包分包时 复制到 主包的目录
  packagename?: string; // 用于 针对 webpack 编译的 chunk 运行时 挂载属性名称  防止针对多 webpack runtime 读取模块的错误
  basePath?: string; // 作为分包时 主包打包 把分包的基本路径传递过来
}
