const path = require("path");
const fs = require("fs");

function BundleVersionPlugin(options) {
    if (!(options.version && typeof options.version === "object")) {
        throw new Error("BundleVersionPlugin | Expected \"version\" property in class options, got " + JSON.stringify(options));
    }

    return {
        apply(compiler) {
            compiler
                .hooks
                .done
                .tap("done", function () {
                    const buildPath = compiler.options.output.path;

                    if (!fs.existsSync(buildPath)) {
                        fs.mkdirSync(buildPath, {recursive: true});
                    }

                    fs.writeFileSync(path.join(buildPath, "version.json"), JSON.stringify(options.version));
                    console.log(options.version.banner + "\n");
                },);
        }
    }
}

module.exports = {
    BundleVersionPlugin,
};
