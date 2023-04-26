/* eslint-disable */
import { createAPI } from '../util';

// mock server: 'http://easy-mock.gm/mock/5fceedfa1ec6fd40c482400c/stddata'
const baseUrl = process.env.REACT_MINI_APP_DJC_GATEWAY;

export default createAPI(baseUrl);