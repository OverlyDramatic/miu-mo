export default {
  state: {
    windowStatus: 0, // * 0-default 1-min 2-max
    navStatus: false // * navBar show and hide
  },
  mutations: {
    'SET-WINDOW-STATUS-MAX'(state) {
      state.windowStatus = 2
    },
    'SET-WINDOW-STATUS-MIN'(state) {
      state.windowStatus = 1
    },
    'SET-WINDOW-STATUS-DEFAULT'(state) {
      state.windowStatus = 0
    },
    'CHANGE-NAV-BAR'(state, value) {
      state.navStatus = typeof value !== 'boolean' ? !state.navStatus : value
    }
  }
}
