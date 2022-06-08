const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/app.js',
    output: {
        //filename: 'app.js',
        // following creates a new dynamic file name, to ensure browser does not use a cached version of a file(Which it will do it if has the same name as a cached file)
        filename: '[contenthash].js',
        path: path.resolve(__dirname, 'assets', 'scripts'),
        publicPath: 'assets/scripts/'
    },
    devtool: 'cheap-source-map',
    plugins: [
        new CleanPlugin.CleanWebpackPlugin()
    ]
};