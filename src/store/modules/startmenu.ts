import {
  pinnedApps,
  recentApps,
  allApps
} from '../../utils';

const defState = {
  pnApps: pinnedApps,
  rcApps: recentApps,
  allApps: allApps,
  hide: true,
  menu: false,
  showAll: false,
  alpha: false,
  curAlpha: 'A',
  qksrch: [
    ["clock", 1, "Today in history"],
    ["film", null, "New movies"],
    ["newspaper", 1, "Top news"],
    ["chart-line", null, "Markets today"]
  ]
};
export default {
  state: () => (defState),
  mutations: {
    STARTOGG: (state: any) => {
      state.menu = true
      state.hide = !state.hide
    },
    STARTSRC: (state: any) => {
      state.menu = false
      state.hide = !state.hide
    }
  },
  actions: {},
  getters: {
    start: (state: any) => {
      var arr = state,
        ln = (6 - arr.pnApps.length % 6) % 6;
      for (var i = 0; i < ln; i++) {
        arr.pnApps.push({
          empty: true
        });
      }

      for (var i = 0; i < arr.rcApps.length; i++) {
        if (arr.rcApps[i].lastUsed < 0) {
          arr.rcApps[i].lastUsed = "Recently Added"
        } else if (arr.rcApps[i].lastUsed < 10) {
          arr.rcApps[i].lastUsed = "Just Now"
        } else if (arr.rcApps[i].lastUsed < 60) {
          arr.rcApps[i].lastUsed += "m ago"
        } else if (arr.rcApps[i].lastUsed < 360) {
          arr.rcApps[i].lastUsed = Math.floor(arr.rcApps[i].lastUsed / 60) + "h ago"
        }
      }

      var tmpApps: any[] = [...arr.allApps], allApps: any = [];
      tmpApps.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      for (var i = 0; i < 27; i++) {
        allApps[i] = [];
      }
      for (var i = 0; i < tmpApps.length; i++) {
        var t1 = tmpApps[i].name.trim().toUpperCase().charCodeAt(0);
        if (t1 > 64 && t1 < 91) {
          allApps[t1 - 64].push(tmpApps[i]);
        } else {
          allApps[0].push(tmpApps[i]);
        }
      }

      arr.contApps = allApps;
      return arr;
    }
  }
}