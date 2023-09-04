# 大家软件小程序开发模版 gmsoft-miniapp-template

# 依赖
  npm install -g @tarojs/cli


# 使用模版
 1、本地直接克隆仓库
 ```bash
 git --clone https://github.com/gmsoft-happyCoding/gmsoft-miniapp-template.git
 ```
 

2、下载Zip
``` 
 https://github.com/gmsoft-happyCoding/gmsoft-miniapp-template
````



# 目录结构
```
gmsoft-miniapp-template
├── node_modules
├── project-config                        // 环境配置文件
│   ├── app.config.js                     // 主包的 app.json配置文件  编译时 会根据环境 生成对应分包配置，主包配置需手动
│   ├── config.ts                         // 主包配置分包 配置文件
│   ├── default.ts                        // 默认环境配置
│   ├── dev.ts                            // 开发环境配置
│   ├── pro.ts                            // 线上环境配置
│   ├── show.ts                           // show环境配置
│   └── test1.ts                          // test1环境配置  
└── config                                // 工程配置文件
    └── enums
       ├── AppType.enum.ts               // 小程序类型枚举
       ├── BuildType.enum.ts             // 小程序分包类型枚举
       ├── Env.enum.ts                   // 运行环境类型枚举
    └── utils 
       ├── build-subpackage.ts           // 主包编译分包 脚本
       ├── build.ts                      // 主包编译 脚本
       ├── buildPlugin.ts                // 运用插件 方法│       ├── index.ts                      // 入口文件
       ├── inquirer.ts                   // 人机交互 脚本
       ├── mergeEnv.ts                   // 合并本地 环境变量 到 taro 变量方法
       ├── outputRoot.ts                 // 编译输出方法
       ├── parseJson.ts                  // 解析jsonstring 方法
    ├── build-dll.ts                      // 公共文件 编译脚本      
    ├── build.ts                          // taro 编译需要文件  生产环境需要                
    ├── dev.ts                            // 项目脚本 生产环境打包 脚本       
    ├── index.ts                          // taro 编译入口文件
    ├── prod.ts                           // taro 编译需要文件  生产环境需要       
    ├── start.ts                          // 项目脚本 开发环境打包 脚本       
    ├── TaroPlugin                        // 编写的taro插件
    └── type.ts                           // 类型声明
└── src
    ├── adapters                          // 兼容多端API 适配器文件夹
    ├── api                               // easy-mock API生成文件夹
    ├── assets                            // 静态资源文件夹
    ├── components                        // 公共组件
    ├── config                            // 公共配置
    ├── constant                          // 公共常量
    ├── enums                             // 公共枚举
    ├── hooks                             // 公共hooks
    ├── models                            // 公共redux数据模型
    ├── pages                             // 小程序pages
    ├── polyfill                          // 兼容环境补丁
    ├── styles                            // 全局样式
    ├── typings                           // 公共类型
    ├── utils                             // 公共工具函数
    ├── app.config.ts                     // 小程序配置
    ├── app.scss                          // 小程序公共样式入口
    ├── app.tsx                           // taro入口文件
    └── global.scss                       // 全局引入scss文件 在编译时 自动注入
│── types                                 // 全局数据类型文件夹    
│── .easy-mock.js
│── .editorconfig
│── .eslintrc
├── .gitignore
│── .prettierrc
│── babel.config.js                       // babel配置文件
├── package.json                          // 项目描述文件
├── project.config.json                   // 微信小程序配置文件
├── project.dd.json                       // 钉钉配置文件（暂无用）
├── project.private.config.json           // 微信小程序配置文件  
├── README.md
├── tsconfig.json                         // typescript 配置文件
└── pnpm-lock.yaml                        // pnpm 依赖锁文件
```




Taro开发依赖项
'regenerator-runtime': 'F:\\gmsoft-miniapp-template\\node_modules\\.pnpm\\regenerator-runtime@0.11.1\\node_modules\\regenerator-runtime\\runtime-module.js',
'@tarojs/runtime': 'F:\\gmsoft-miniapp-template\\node_modules\\.pnpm\\@tarojs+runtime@3.6.5\\node_modules\\@tarojs\\runtime\\dist\\runtime.esm.js',
'@tarojs/shared': 'F:\\gmsoft-miniapp-template\\node_modules\\.pnpm\\@tarojs+shared@3.6.5\\node_modules\\@tarojs\\shared\\dist\\shared.esm.js',
'@/components': 'F:\\gmsoft-miniapp-template\\src\\components',
'@/utils': 'F:\\gmsoft-miniapp-template\\src\\utils',
'@/models': 'F:\\gmsoft-miniapp-template\\src\\models',
'@/api': 'F:\\gmsoft-miniapp-template\\src\\api',
'@/enums': 'F:\\gmsoft-miniapp-template\\src\\enums',
'@/constant': 'F:\\gmsoft-miniapp-template\\src\\constant',
'@/hooks': 'F:\\gmsoft-miniapp-template\\src\\hooks',
'@tarojs/components$': '@tarojs/plugin-platform-weapp/dist/components-react',
'react-dom$': '@tarojs/react',
'react-reconciler$': 'react-reconciler/cjs/react-reconciler.production.min.js',
'react$': 'react/cjs/react.production.min.js',
'react/jsx-runtime$': 'react/cjs/react-jsx-runtime.production.min.js'


Taro 生产环境依赖项
'regenerator-runtime': 'F:\\gmsoft-miniapp-template\\node_modules\\.pnpm\\regenerator-runtime@0.11.1\\node_modules\\regenerator-runtime\\runtime-module.js',
'@tarojs/runtime': 'F:\\gmsoft-miniapp-template\\node_modules\\.pnpm\\@tarojs+runtime@3.6.5\\node_modules\\@tarojs\\runtime\\dist\\runtime.esm.js',
'@tarojs/shared': 'F:\\gmsoft-miniapp-template\\node_modules\\.pnpm\\@tarojs+shared@3.6.5\\node_modules\\@tarojs\\shared\\dist\\shared.esm.js',
'@/components': 'F:\\gmsoft-miniapp-template\\src\\components',
'@/utils': 'F:\\gmsoft-miniapp-template\\src\\utils',
'@/models': 'F:\\gmsoft-miniapp-template\\src\\models',
'@/api': 'F:\\gmsoft-miniapp-template\\src\\api',
'@/enums': 'F:\\gmsoft-miniapp-template\\src\\enums',
'@/constant': 'F:\\gmsoft-miniapp-template\\src\\constant',
'@/hooks': 'F:\\gmsoft-miniapp-template\\src\\hooks',
'@tarojs/components$': '@tarojs/plugin-platform-weapp/dist/components-react',



主要依赖库版本锁定
react@18.2.0
react-dom@18.2.0
react-reconciler@0.27.0
redux@4.2.1
react-redux@8.1.2
dva-core@2.0.4
dva-loading@3.0.24
dva-model-creator@0.4.3
@linaria/core@4.5.4
@linaria/react@4.5.4



