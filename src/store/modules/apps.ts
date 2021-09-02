import {
  allApps
} from '../../utils';

var dev = "";

const defState: any = {};
for (var i = 0; i < allApps.length; i++) {
  defState[allApps[i].icon] = allApps[i];
  defState[allApps[i].icon].size = "full";
  defState[allApps[i].icon].hide = true;
  defState[allApps[i].icon].max = null;
  defState[allApps[i].icon].z = 0;
  if (allApps[i].icon == dev) {
    defState[allApps[i].icon].hide = false;
    defState[allApps[i].icon].max = true;
    defState[allApps[i].icon].z = 1;
  }
}

defState.hz = 1;
export default {
  state: () => (defState),
  mutations: {},
  actions: {},
  getters: {
  }
}