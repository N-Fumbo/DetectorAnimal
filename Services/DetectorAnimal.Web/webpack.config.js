const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname) + '/TypeScript/index.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'wwwroot', 'js', 'build')
    },
    module: {
        rules: [{
            test: /\.ts$/,
            include: path.resolve(__dirname, "TypeScript"),
            loader: 'ts-loader'
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: 'source-map'
}