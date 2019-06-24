// Under the hood of Vue.js

// instance of the component we're working on at the moment
// must be visible by functions
let currentInstance = null;

/***** Function API ******/

export const value = initialValue => {
  return currentInstance.addValue(initialValue);
};

export const computed = expression => {
  return currentInstance.addComputed(expression);
};

export const watch = (expression, callback) => {
  currentInstance.addWatch(expression, callback);
};

export const onMounted = callback => {
  currentInstance.addMounted(callback);
};

/***** end Function API ******/

/**
 * Called internally by Vue each time it's gonna instantiate a component
 * @param {Object} options - component options (those options we used to write in .vue files)
 * @return {Object} - internal representation of Vue component
 */
const createInstance = (options) => {
  // allocate a new instance and make it visible by functions
  currentInstance = {
    addValue() {
      // value implementation
    },
    addComputed() {
      // computed implementation
    },
    addWatch() {
      // watch implementation
    },
    addMounted() {
      // mounted implementation
    },
  };
  // run functions on the instance
  options.setup();
  // ...
  // somehow initialize other options
  // ...
  return currentInstance;
};
