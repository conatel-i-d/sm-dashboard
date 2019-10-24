export function round(number) {
  return Math.round(number * 100 / 100);
}

export function monitorEnhancer(createStore) {
  return function (reducer, initialState, enhancer) {
    return createStore(monitoredReducer, initialState, enhancer);

    function monitoredReducer(state, action) {
      const start = performance.now();
      const newState = reducer(state, action);
      const end = performance.now();
      const diff = round(end - start);

      console.log('reducer process time:', diff);

      return newState;
    }
  }
}

export default monitorEnhancer;