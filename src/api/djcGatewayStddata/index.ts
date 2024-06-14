import instance from './instance';
import { convertRESTAPI } from '../util';
import type { Opts,WithPathOpts } from "../type";

/** 获取指定区域 */
function stddata_districts_key_get(opts?: WithPathOpts) {
  return instance({
    method: 'GET',
    url: convertRESTAPI('/stddata/districts/{key}', opts),
    opts: opts
  });
}

/** 检查日期类型 */
function stddata_workdays_checking_get(opts?: Opts) {
  return instance({
    method: 'GET',
    url:  '/stddata/workdays/checking',
    opts: opts
  });
}

/** 日期查询 */
function stddata_workdays_day_get(opts?: Opts) {
  return instance({
    method: 'GET',
    url:  '/stddata/workdays/day',
    opts: opts
  });
}

/** 天数查询 */
function stddata_workdays_num_get(opts?: Opts) {
  return instance({
    method: 'GET',
    url:  '/stddata/workdays/num',
    opts: opts
  });
}

/** 查询区域(树形) */
function stddata_districts_get(opts?: Opts) {
  return instance({
    method: 'GET',
    url:  '/stddata/districts',
    opts: opts
  });
}

/** 删除区域缓存 */
function stddata_districts_cache_delete(opts?: Opts) {
  return instance({
    method: 'DELETE',
    url:  '/stddata/districts/cache',
    opts: opts
  });
}

/** 查询区域直接下级 */
function stddata_districts_id_children_get(opts?: WithPathOpts) {
  return instance({
    method: 'GET',
    url: convertRESTAPI('/stddata/districts/{id}/children', opts),
    opts: opts
  });
}

/** 查询区域直接下级 */
function stddata_api_v1_0_location_districts_id_children_get(opts?: WithPathOpts) {
  return instance({
    method: 'GET',
    url: convertRESTAPI('/stddata/api/v1.0/location/districts/{id}/children', opts),
    opts: opts
  });
}

/** 获取指定区域 */
function stddata_api_v1_0_location_districts_key_get(opts?: WithPathOpts) {
  return instance({
    method: 'GET',
    url: convertRESTAPI('/stddata/api/v1.0/location/districts/{key}', opts),
    opts: opts
  });
}

/** 查询区域(树形) */
function stddata_api_v1_0_location_districts_get(opts?: Opts) {
  return instance({
    method: 'GET',
    url:  '/stddata/api/v1.0/location/districts',
    opts: opts
  });
}

export {
  stddata_districts_key_get,
  stddata_workdays_checking_get,
  stddata_workdays_day_get,
  stddata_workdays_num_get,
  stddata_districts_get,
  stddata_districts_cache_delete,
  stddata_districts_id_children_get,
  stddata_api_v1_0_location_districts_id_children_get,
  stddata_api_v1_0_location_districts_key_get,
  stddata_api_v1_0_location_districts_get
};