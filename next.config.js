module.exports = {
  reactStrictMode: true,
}
const webpack = require('webpack')

const { parsed: myEnv } = require('dotenv').config({
    path:'/home/poncio/Prog_Dirs/Guavaprojects/fruitionv2/.env'
})

module.exports = {
    webpack(config) {
        config.plugins.push(new webpack.EnvironmentPlugin(myEnv))
        return config
    }/,

    // Proxy Reroute | Needs to be used in production to avoid CORS errors
    //
    // async rewrites(){
    //   return [
    //     {
    //       source: '/mint/:path*',
    //       destination: 'http://localhost:5005/:path*'
    //     }
    //   ]
    // }
}
