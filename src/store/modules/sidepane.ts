export default {
  state: () => ({
    quicks: [
      {
        ui: true,
        src: 'location',
        name: 'Location',
        state: false
      },
      {
        ui: true,
        src: 'saver',
        name: 'Battery Saver',
        state: true
      },
      {
        ui: true,
        src: 'nightlight',
        name: 'Night Light',
        state: false
      },
      {
        ui: true,
        src: 'bluetooth',
        name: 'Bluetooth',
        state: false
      },
      {
        ui: true,
        src: 'airplane',
        name: 'Offline mode',
        state: false
      },
      {
        ui: true,
        src: 'connect',
        name: 'Connect',
        state: false
      },
      {
        ui: true,
        src: 'project',
        name: 'Project',
        state: false
      },
      {
        ui: true,
        src: 'network',
        name: 'Network',
        state: false
      },
      {
        ui: true,
        src: 'nearshare',
        name: 'Sharing',
        state: false
      },
      {
        ui: true,
        src: 'tablet',
        name: 'Tablet mode',
        state: false
      },
      {
        ui: true,
        src: 'shield',
        name: 'Security',
        state: false
      },
      {
        ui: true,
        src: 'moon',
        name: 'Focus assist',
        state: false
      }
    ],
    hide: true,
    calhide: true
  }),
  mutations: {
    PANETOGG: (state: any) => {
      state.hide = !state.hide
    },
  },
  getters: {
    paneApps: (state: any) => state
  }
}