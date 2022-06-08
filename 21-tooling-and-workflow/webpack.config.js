const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'assets', 'scripts'),
        publicPath: 'assets/scripts/'
    },
    // following helps with debugging so you can see your original code in browser devtools
    devtool: 'cheap-module-eval-source-map',
    //devServer: {
    ///    contentBase: './'   // where index.html file is, is also the default so need to put this here
    //}
    plugins: [
        new CleanPlugin.CleanWebpackPlugin()  // remove old build files
    ]
};