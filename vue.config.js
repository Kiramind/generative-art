module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/generative-art/'
    : '/',

    transpileDependencies: [
      'vuetify'
    ]
}
