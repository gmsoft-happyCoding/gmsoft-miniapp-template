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
│   ├── default.ts                        // 默认环境配置
│   ├── dev.ts                            // 开发环境配置
│   ├── pro.ts                            // 线上环境配置
│   ├── show.ts                           // show环境配置
│   └── test1.ts                          // test1环境配置  
├── config                                // 工程配置文件
│   ├── build.ts                          
│   ├── dev.ts                            
│   ├── index.ts
│   ├── prod.ts         
│   ├── start.ts
│   └── utils.ts         
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
    ├── app.less                          // 小程序公共样式入口
    ├── app.tsx                           // taro入口文件
    └── index.html                        // H5编译HTML
│── types                                 // 全局数据类型文件夹    
│── .easy-mock.js
│── .editorconfig
│── .eslintrc
├── .gitignore
│── .prettierrc
│── babel.config.js
├── package.json                            // 项目描述文件
├── project.config.json                     // 微信小程序配置文件
├── project.dd.json                         // 钉钉配置文件（暂无用）
├── project.private.config.json             // 微信小程序配置文件  
├── README.md
├── tsconfig.json                           // typescript 配置文件
└── yarn.lock
```
