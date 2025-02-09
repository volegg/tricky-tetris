const {merge} = require("webpack-merge");
const ESLintPlugin = require("eslint-webpack-plugin");

const paths = require("./paths.js");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "eval",
    entry: {
        index: paths.src("index.ts")
    },
    output: {
        path: paths.dist("dev"),
        filename: "[name]_[id].bundle.js",
        publicPath: paths.publicDir,
        chunkFilename: "[name]_[id].js"
    },
    module: {
        rules: [
            {
                test: /\.pcss$/,
                use: [
                    {
                        loader: "style-loader"
                    }
                ]
            }
        ]
    },
    plugins: [new ESLintPlugin()]
});
