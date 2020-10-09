<template>
  <div>
    <v-btn @click="clickOpenDir">
      open directory
    </v-btn>
  </div>
</template>
<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'OpenDir',
  methods: {
    clickOpenDir() {
      ipcRenderer.send('open-dir')
    }
  },
  mounted() {
    ipcRenderer.on('reply-dir', function(event, arg) {
      console.log(arg)
    })
  }
}
</script>
<style></style>
