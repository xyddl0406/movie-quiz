const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: { 
      "/v1/search/movie.json": {
        "target" : "https://openapi.naver.com/"
      }
    }
  }
});
