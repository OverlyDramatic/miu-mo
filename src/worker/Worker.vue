<template>
  <div id="worker"></div>
</template>

<script>
import { initFileWorker } from '@/worker/file.worker'

export default {
  name: 'Worker',
  created() {
    initFileWorker()
  }
}
</script>
