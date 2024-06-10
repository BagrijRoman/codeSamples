const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const distPath = path.resolve(__dirname, "build");

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './index.jsx'],
  output: {
    filename: "bundle.js",
    path: distPath,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/i,
        type: "asset/resource",
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
    })
  ],
  devServer: {
    static: "./dist",
    port: 3005,
    open: true,
    hot: true,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
