const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {merge} = require("webpack-merge");
const config = require("./webpack.prod.js");

module.exports = merge(config, {
    plugins: [new BundleAnalyzerPlugin()]
});
