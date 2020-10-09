module.exports = {
  transpileDependencies: ['vuetify'],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      mainProcessWatch: [
        'src/main/window.background.js',
        'src/main/database.background.js',
        'src/main/action/index.js',
        'src/main/action/openDir.background.js'
      ]
    }
  }
}
