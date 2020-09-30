const loadingAction = {
  start: (reducer) => {
    return {
      type: `LOADING_${reducer}`,
      loading: true
    };
  },
  pause: (reducer) => {
    return {
      type: `LOADING_${reducer}`,
      loading: false
    };
  }
};

export default loadingAction;
