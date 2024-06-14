import Taro from "@tarojs/taro";

// 如果有额外的配置项, 请在此声明类型
type Extend = {
  paramsSerializer?: (
    params?: { [key: string]: string } | string
  ) => string | undefined;
  params?: { [key: string]: any };
};

interface PathParam {
  path: { [key: string]: string };
}

export type Opts = Omit<Taro.request.Option, "url"> & Extend;

export type WithPathOpts = Opts & PathParam;

export type Conf = {
  method: string;
  url: string;
  opts?: Opts | WithPathOpts;
};
