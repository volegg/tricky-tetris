const webpack = require("webpack");
const {merge} = require("webpack-merge");

const paths = require("./paths.js");
const dev = require("./webpack.dev.js");

module.exports = merge(dev, {
    output: {
        path: paths.dist("start"),
        filename: "[name]_[id].bundle.js",
        publicPath: paths.publicDir,
        chunkFilename: "[name]_[id].js"
    },
    devServer: {
        client: {
            overlay: {
                errors: true,
                warnings: false
            }
        },
        historyApiFallback: true,
        host: "0.0.0.0",
        compress: false,
        hot: true,
        port: 7070,
        open: ["/"]
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
});
