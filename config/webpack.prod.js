const TerserJSPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const {merge} = require("webpack-merge");

const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminWebp = require("imagemin-webp");

const paths = require("./paths.js");
const config = require("./webpack.common.js");

module.exports = merge(config, {
    entry: {
        index: paths.src("index.ts")
    },
    output: {
        path: paths.dist("prod"),
        filename: "[contenthash:8].js",
        publicPath: paths.publicDir,
        chunkFilename: "[contenthash:4][id].js",
        hashFunction: "md5",
        hashDigest: "hex"
    },
    mode: "production",
    devtool: false,
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new ESLintPlugin({emitError: true, emitWarning: true, failOnError: true, failOnWarning: true}),
        new TerserJSPlugin({}),
        new ImageminPlugin({
            test: /\.(jpe?g|png|svg)$/i,
            disable: false,
            plugins: [imageminWebp({quality: 90})]
        })
    ],
    optimization: {
        minimize: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        minimizer: [new TerserJSPlugin({
                minify: TerserJSPlugin.swcMinify,
                terserOptions: {
                    cache: true,
                    ecma: 6,
                    mangle: true,
                    keep_classnames: false,
                    keep_fnames: false,
                    output: {
                        comments: false
                    },
                    parallel: true,
                    safari10: true,
                    toplevel: true,
                    wrap_iife: true
                }
            })]
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    stats: 'errors-warnings'
});
