const path = require('path');
const webpack = require('webpack');
var fs = require('fs');
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './setup/www',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'bin'),
        filename: 'www.js'
    },
    performance: {
        hints: "warning",
        maxEntrypointSize: 2097152, // 2MB
    },
    plugins: [
        new webpack.ExtendedAPIPlugin()
    ],
    target: 'node',
    externals: nodeModules
};
