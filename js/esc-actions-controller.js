export const openedWindowsController = (() => {
  const stateOfOpenedWindows = [];

  return {
    pushWindowToState(obj) {
      stateOfOpenedWindows.push(obj);
    },

    removeWindowFromState(obj) {
      const index = stateOfOpenedWindows.indexOf(obj);
      if (index > -1) {
        stateOfOpenedWindows.splice(index, 1);
      }
    },

    getOpenedWindows() {
      return [...stateOfOpenedWindows];
    }
  };
})();

export const escActionsController = (() => ({
  closeWindow(cb, window) {
    const lastOpenedWindow = openedWindowsController.getOpenedWindows().slice(-1)[0];
    if (lastOpenedWindow === window) {
      cb();
    }
  }
}))();
