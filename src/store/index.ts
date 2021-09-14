import { createStore } from 'vuex'
import taskApps from './modules/taskApps'
import apps from './modules/apps'
import desktop from './modules/desktop'
import startmenu from './modules/startmenu'
import widpane from './modules/widpane'
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    taskApps,
    apps,
    desktop,
    startmenu,
    widpane
  },
  getters: {
    apps: (state: any) => {
      var tmpApps = { ...state.apps };
      for (var i = 0; i < state.apps.length; i++) {
        tmpApps[state.apps[i].icon].task = true;
      }
      return tmpApps;
    },
    deskApps: (state: any) => {
      var arr = { ...state.desktop };
      var tmpApps = [...arr.apps];

      if (arr.sort == "name") {
        tmpApps.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      } else if (arr.sort == "size") {
        tmpApps.sort((a, b) => {
          var anm = a.name, bnm = b.name;

          return (anm[bnm.charCodeAt(0) % anm.length] >
            bnm[anm.charCodeAt(0) % bnm.length]
          ) ? 1 : -1
        })
      } else if (arr.sort == "date") {
        tmpApps.sort((a, b) => {
          var anm = a.name, bnm = b.name;
          var anml = anm.length, bnml = bnm.length;

          return (
            anm[(bnml * 13) % anm.length] > bnm[(anml * 17) % bnm.length]
          ) ? 1 : -1
        })
      }

      arr.apps = tmpApps;
      return arr;
    },
  }
})