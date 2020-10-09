<template>
  <v-app-bar class="app-header-bar" app dense>
    <v-app-bar-nav-icon
      @click="$store.commit('CHANGE-NAV-BAR')"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>{{ $store.state.app.appName }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- 最小化窗口 minimize the window -->
    <v-btn icon @click="minimizeTheWindow">
      <v-icon>mdi-window-minimize</v-icon>
    </v-btn>
    <!-- <v-btn icon>
        <v-icon>fas fa-clone</v-icon>
      </v-btn> -->
    <!-- fullscreen 全屏 -->
    <v-btn icon @click="maximizeTheWindow">
      <v-icon v-show="$store.state.window.windowStatus !== 2"
        >mdi-window-maximize</v-icon
      >
      <v-icon v-show="$store.state.window.windowStatus === 2"
        >mdi-window-restore</v-icon
      >
    </v-btn>
    <!-- 关闭窗口 close window -->
    <v-btn icon @click="closeApp">
      <v-icon>mdi-window-close</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'TopBar',
  methods: {
    closeApp() {
      ipcRenderer.send('window-close')
    },
    minimizeTheWindow() {
      ipcRenderer.send('window-min')
    },
    maximizeTheWindow() {
      ipcRenderer.send('window-max')
    },
    changeDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>
<style></style>
