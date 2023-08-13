// import { get } from 'lodash/get';
// import { omit } from 'lodash/omit';
// import { merge } from 'lodash/merge';

import { get, omit, merge } from 'lodash';

const test = {
  a: 1,
  b: 2,
};

const test1 = {
  c: 1,
};

console.log(get(test, 'a'));

console.log(omit(test, ['b']));

console.log(merge(test, test1));
