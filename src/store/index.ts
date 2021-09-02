import { createStore } from 'vuex'
import taskApps from './modules/taskApps'
import apps from './modules/apps'
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    taskApps,
    apps
  },
  getters: {
    apps: (state: any) => {
      console.log(state)
      var tmpApps = { ...state.apps };
      for (var i = 0; i < state.apps.length; i++) {
        tmpApps[state.apps[i].icon].task = true;
      }
      return tmpApps;
    },
  }
})