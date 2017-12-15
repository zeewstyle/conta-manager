const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  /*externals: [nodeExternals()],*/
  entry: {
    final: ['./src/index','./src/css/main.css']    
  },
  plugins: [
    new ExtractTextPlugin("./css/styles.css"),
  ],
  output: {
    path: path.resolve('./public'),
    filename: './js/[name].js',
    publicPath: '/public'
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /(node_modules)/
      },
      { 
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })}
    ]
  },
  resolve:{
    extensions: [".ts", ".tsx", ".jsx", ".js"]
  },
  devServer:{
    contentBase: path.resolve("./public"),
    compress: true,
    hot: true,
    port: 5000
  }
}