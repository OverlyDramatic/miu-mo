import { ipcRenderer } from 'electron'

export function initWindowControl(vm) {
  ipcRenderer.on('window-max', function() {
    console.log('window-max', vm.$store)
    vm.$store.commit('SET-WINDOW-STATUS-MAX')
  })
  ipcRenderer.on('window-unmax', function() {
    console.log('window-unmax', vm.$store)
    vm.$store.commit('SET-WINDOW-STATUS-DEFAULT')
  })
  ipcRenderer.on('window-min', function() {
    console.log('window-min', vm.$store)
    vm.$store.commit('SET-WINDOW-STATUS-MIN')
  })
  ipcRenderer.on('window-restore', function() {
    console.log('window-restore', vm.$store)
    vm.$store.commit('SET-WINDOW-STATUS-DEFAULT')
  })
}
