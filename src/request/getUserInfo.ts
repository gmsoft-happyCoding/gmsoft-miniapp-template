const getUserInfo = async () =>
  new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });

export default getUserInfo;
