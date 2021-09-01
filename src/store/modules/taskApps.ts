import {
  taskApps
} from '../../utils';

export default {
  state: () => ({
    apps: taskApps,
    prev: false,
    prevApp: '',
    prevPos: 0,
    align: 'center',
    search: true,
    widgets: true
  }),
  mutations: {},
  actions: {},
  getters: {
    tasks: (state: any) => state
  }
}