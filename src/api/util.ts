import Taro from "@tarojs/taro";
import qs from "qs";
import { omit } from "lodash";
import type { Conf, Opts, WithPathOpts } from "./type";

const defaultParams = {
  header: {
    "Content-type": "application/json",
  },
};

const defaultParamsSerializer = (params) =>
  qs.stringify(params, {
    arrayFormat: "repeat",
    allowDots: true,
    addQueryPrefix: true,
  });

function createAPI(baseURL?: string) {
  return function (conf: Conf) {
    const opts = (conf.opts || {}) as Opts | WithPathOpts;

    const paramsSerializer = opts.paramsSerializer;

    const params = opts.params;

    const requestData = opts.data;

    return Taro.request(
      Object.assign(
        {},
        defaultParams,
        {
          url: `${baseURL}${conf.url}${
            !!paramsSerializer
              ? paramsSerializer(params)
              : defaultParamsSerializer(params)
          }`,
          method: conf.method,
          ...(requestData ? { data: JSON.stringify(requestData) } : {}),
        },
        omit(opts, ["path", "paramsSerializer", "params", "data"])
      )
    );
  };
}

function convertRESTAPI(url, opts) {
  if (!opts || !opts.path) return url;

  const pathKeys = Object.keys(opts.path);

  pathKeys.forEach((key) => {
    const r = new RegExp("(:" + key + "|{" + key + "})", "g");
    url = url.replace(r, opts.path[key]);
  });

  return url;
}

export { createAPI, convertRESTAPI };
