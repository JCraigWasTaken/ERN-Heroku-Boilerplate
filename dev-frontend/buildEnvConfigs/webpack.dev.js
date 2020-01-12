const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        proxy: {
            '/some_route': 'http://localhost:5000'
        }
    }
});