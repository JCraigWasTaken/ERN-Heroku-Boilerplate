var Path = require('path')
var HTMLWebPackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:"./src/app.js",
    output:{
        path: Path.resolve(__dirname,"../prod"),
        filename:"index-bundle.js"
    },
    module:{
        rules:[
            {test:/\.(js)$/,
            use:'babel-loader'},
            {test:/\.css$/,
            use:['style-loader','css-loader']},
            {test: /\.(gif|svg|jpg|png)$/,
                loader: "file-loader"}
        ]
    },
    mode:'development',
    plugins:[
        new HTMLWebPackPlugin({
            template:'src/index.html'
        })
    ],
    devServer: {
        proxy: {
            '/some_route': 'http://localhost:5000'
        }
      }
}