const Path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
    entry: './src/app.js',
    plugins:[
        new CleanWebpackPlugin(),
        new HTMLWebPackPlugin({
            favicon: 'media/favicon.png',
            template: 'src/index.html'
        })
    ],
    module:{
        rules:[
            {test: /\.(js)$/,
            use: 'babel-loader'},
            {test: /\.css$/,
            use: ['style-loader','css-loader']},
            {test: /\.(gif|svg|jpg|png)$/,
            loader: 'file-loader?name=media/[name].[ext]'}
        ]
    },
    output:{
        path:Path.resolve(__dirname,'../../prod-frontend'),
        filename: 'bundle.js'
    }
}