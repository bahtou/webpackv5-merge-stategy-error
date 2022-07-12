import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';


interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: 'development',
  output: {
    publicPath: '/',
    filename: '[name].[contenthash].js'
  },
  entry: {
    index: './src/index.tsx',
    shared: ['react', 'react-dom', 'react-router-dom'],
    home: {
      import: './src/pages/home/index.tsx',
      dependOn: ['index', 'shared']
    },
    about: {
      import: './src/pages/about/index.tsx',
      dependOn: ['index', 'shared']
    }
  },
  module: {
    rules: [
      {
        test: /\.(?:ts|js)x?$/iu,
        exclude: /node_modules/u,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: './babelrc.json',
            cacheDirectory: true,
            cacheCompression: true
          }
        }
      },
      {
        test: /\.css$/u,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/about.html',
    //   inject: true,
    //   chunks: ['about'],
    //   filename: 'about.html'
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/home.html',
    //   inject: true,
    //   chunks: ['home'],
    //   filename: 'home.html'
    // }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'build'),
    historyApiFallback: true,
    port: 8000,
    open: false,
    hot: true
  }
};


export default config;
