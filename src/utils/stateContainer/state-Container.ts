import createStateContainer from '@gmsoft-mini-app/state-container';

export default createStateContainer({
  NODE_ENV: process.env.NODE_ENV,
  onError: err => {
    console.error(err);
  },
});
