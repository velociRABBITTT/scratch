const path = require("path");

module.exports = {
  entry: ["regenerator-runtime/runtime.js", "./client/index.js"], //initial file that webpack parses through to make a graph
  output: {
    path: path.resolve(__dirname, "build"), //tells webpack where to emit the bundles(not created until you run build)
    filename: "bundle.js",
  }, //setting mode to be the "environment variable"
  mode: process.env.NODE_ENV, //switched process.env.NODE_ENV this will be flexible to hold both production/development setting
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i, //style loader injects CSS into DOM
        use: ["style-loader", "css-loader"], //css loader interprets @import and url()
      },
    ],
  }, //closes module object
  devServer: {
    hot: true,
    publicPath: "/build/",
    proxy: { "*": "http://localhost:3000/" },
    port: 8080,
  },
}; //closes module.expots
