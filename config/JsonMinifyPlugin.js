function JsonMinifyPlugin() {
    return {
        apply(compiler) {
            compiler
                .hooks
                .emit
                .tapAsync('JsonMinifyPlugin', (compilation, callback) => {
                    Object
                        .keys(compilation.assets)
                        .forEach((filename) => {
                            if (filename.endsWith('.json')) {
                                const asset = compilation.assets[filename];
                                const minifiedContent = JSON.stringify(JSON.parse(asset.source()));

                                compilation.assets[filename] = {
                                    source: () => minifiedContent,
                                    size: () => minifiedContent.length
                                };
                            }
                        });
                    callback();
                });
        }
    }
}

module.exports = {
    JsonMinifyPlugin
};
