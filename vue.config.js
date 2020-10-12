module.exports = {
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
