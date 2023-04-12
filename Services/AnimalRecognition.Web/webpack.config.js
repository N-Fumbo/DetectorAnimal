const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        indexUserAuthorized: path.resolve(__dirname) + '/TypeScript/indexUserAuthorized.ts',
        indexUserNotAuthorized: path.resolve(__dirname) + '/TypeScript/indexUserNotAuthorized.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'wwwroot', 'js', 'build')
    },
    module: {
        rules: [{
            test: /\.ts$/,
            include: path.resolve(__dirname, "TypeScript"),
            use: [
                {
                    loader: 'ts-loader'
                }
            ]
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: 'source-map'
}