module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: process.env.VUE_APP_NAME
    },
    worker: {
      entry: 'src/worker/main.js',
      template: 'public/worker.html',
      filename: 'worker.html',
      title: 'worker_process'
    }
  },
  transpileDependencies: ['vuetify'],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      mainProcessWatch: [
        'src/main/window.background.js',
        'src/main/database/database.background.js',
        'src/main/action/index.js',
        'src/main/action/file.background.js',
        'src/main/log/log.background.js',
        'src/main/media/media.background.js'
      ]
    }
  }
}
