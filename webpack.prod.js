



const HtmlWebpack =          require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin =           require("copy-webpack-plugin");

const CssMinimizer =         require('css-minimizer-webpack-plugin');
const Terser =               require('terser-webpack-plugin')

module.exports = {

    mode: 'production',

    //:: limpia y crea dist
    output: {
        clean: true,
        filename:'main.[contenthash].js'
    },


    module:{
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: false,
                },
            },
            {
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: ["style-loader", "css-loader"],
            },

            {
                test: /styles.css$/,
                use: [ MiniCssExtractPlugin.loader,  'css-loader' ],
            },

            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            },
            //:: map-loader no dependencia de undemy
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
              },
              
              {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },

    optimization:{
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser()
        ]
    },

    plugins:[
        new HtmlWebpack({
            title: 'Webpack app',
            filename:'index.html',
            template: './src/index.html'
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
              { from: "src/assets", to: "assets/" },
            ],
          }),
         
    ]

}