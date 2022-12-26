const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: '/movie-quiz',
  outputDir: 'docs',
  transpileDependencies: true,
  devServer: {
    proxy: { 
      "/v1/search/movie.json": {
        "target" : "https://openapi.naver.com/"
      }
    }
  }
});
