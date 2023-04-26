import Taro from "@tarojs/taro";

// 如果有额外的配置项, 请在此声明类型
type Extend = {
  paramsSerializer?: (
    params?: { [key: string]: string } | string
  ) => string | undefined;
};

interface PathParam {
  path: { [key: string]: string };
}

export type Opts = Taro.request.Option & Extend;

export type WithPathOpts = Opts & PathParam;

export type Conf = {
  method: string;
  url: string;
  opts?: Opts | WithPathOpts;
};
