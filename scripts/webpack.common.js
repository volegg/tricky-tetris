const webpack = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const {BundleVersionPlugin} = require("./BundleVersionPlugin");
const {JsonMinifyPlugin} = require("./JsonMinifyPlugin");
const {version} = require("./version");

const paths = require("./paths");

const vendor = ["core-js", "eventemitter3", "pixi.js", "@pixi/particle-emitter"];
const isProd = process.env.NODE_ENV === "production";

module.exports = {
    optimization: isProd
        ? {
            splitChunks: {
                chunks: "all",
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                cacheGroups: {
                    vendor: {
                        name: "vendor",
                        chunks: "all",
                        reuseExistingChunk: true,
                        test(mod) {
                            if (!mod.context) {
                                return false;
                            }

                            if (!mod.context.includes("node_modules")) {
                                return false;
                            }

                            return vendor.some((str) => mod.context.includes(str));
                        }
                    },
                    main: {
                        name: "main",
                        chunks: "all",
                        reuseExistingChunk: true,
                        test(mod) {
                            if (!mod.context) {
                                return false;
                            }

                            return !vendor.some((str) => mod.context.includes(str));
                        }
                    }
                }
            }
        }
        : undefined,
    plugins: [
        new webpack.DefinePlugin({
            "BUILD_OPTIONS.prod": JSON.stringify(isProd),
            "BUILD_OPTIONS.dev": JSON.stringify(process.env.NODE_ENV === "development"),
            "BUILD_OPTIONS.version": JSON.stringify(version)
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                copyFromTo(paths.public(), paths.publicDir),
                copyFromTo(paths.assets(), paths.publicDir)
            ]
        }),
        new HtmlWebpackPlugin({
            inject: "body",
            template: paths.src("index.html"),
            filename: "index.html",
            chunks: ["index"],
            templateParameters: {
                title: version.name
            },
            minify: {
                html5: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),

        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: paths.src("**/*.{ts,tsx,js,jsx}"), // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
            }
        }),

        new BundleVersionPlugin({version: version}),
        new JsonMinifyPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                }
            },
            // Images: Copy image files to build folder
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource"
            },

            // Fonts
            {
                test: /\.(woff(2)?|eot|ttf|otf|)$/,
                type: "asset/resource"
            },

            // Inlines svg-files
            {
                test: /\.svg$/,
                type: "asset/inline"
            },

            // For svg files which should be loaded as resource
            {
                test: /\.resource\.svg$/,
                type: "asset/resource"
            },

            // For png files which should be inline loaded
            {
                test: /\.inline\.png$/,
                type: "asset/inline"
            }
        ]
    },

    resolve: {
        modules: [
            paths.src(),
            "node_modules"
        ],
        extensions: [
            ".json", ".ts", ".tsx"
        ],
        alias: {
            assets: paths.assets(),
            src: paths.src()
        }
    },

    stats: {
        children: true,
        preset: "minimal",
        warnings: true
    }
};

function copyFromTo(from, to) {
    return {
        from,
        to,
        globOptions: {
            ignore: ["*.DS_Store", "**/*.ts", "**/*.js", "**/*.map"]
        },
        noErrorOnMissing: true
    };
}
