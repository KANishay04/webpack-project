const path = require('path') 
const HtmlWebpackPlugin = require('html-webpack-plugin') 
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin 
 
module.exports = { 
  mode: 'development', 
  entry: { 
    bundle: path.resolve(__dirname, 'src/index.js'), 
    about: path.resolve(__dirname, 'src/about.js'),  
  }, 
  output: { 
    path: path.resolve(__dirname, 'dist'), 
    filename: '[name].[contenthash].js',  
    clean: true, 
    assetModuleFilename: '[name][ext]', 
  }, 
  devtool: 'source-map', 
  devServer: { 
    static: { 
      directory: path.resolve(__dirname, 'dist'), 
    }, 
    port: 3000, 
    open: true, 
    hot: true, 
    compress: true, 
    historyApiFallback: true, 
  }, 
  module: { 
    rules: [ 
      { 
        test: /\.scss$/, 
        use: ['style-loader', 'css-loader', 'sass-loader'], 
      }, 
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: { 
          loader: 'babel-loader', 
          options: { 
            presets: ['@babel/preset-env'], 
          }, 
        }, 
      }, 
      { 
        test: /\.(png|svg|jpg|jpeg|gif)$/i, 
        type: 'asset/resource', 
      }, 
    ], 
  }, 
  plugins: [ 
    new HtmlWebpackPlugin({ 
      title: 'Webpack App', 
      filename: 'index.html', 
      template: 'src/index.html', 
      chunks: ['bundle'], // Specify main bundle chunk 
    }), 
    new HtmlWebpackPlugin({ 
      title: 'Webpack App - About', 
      filename: 'about.html', 
      template: 'src/about.html', 
      chunks: ['about'], // Specify about page bundle chunk 
    }), 
 
    new BundleAnalyzerPlugin(), 
  ], 
}