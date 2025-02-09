const path = require("path");
const root = path.resolve(__dirname, "../");

module.exports = {
    resolve: path
        .resolve
        .bind(path),
    join: path
        .join
        .bind(path),

    // path to source or from source directory
    root: getPathFrom(""),
    src: getPathFrom("src"),
    assets: getPathFrom("assets"),
    public: getPathFrom("public"),

    // path to distributed
    dist: getPathFrom("build"),
    // public directories
    publicDir: ""
};

function getPathFrom(pathFrom) {
    return (filepath = "") => {
        return getPath(pathFrom + (filepath
            ? "/" + filepath
            : ""));
    }
}

function getPath(pathStr = "") {
    if (!pathStr) {
        return root;
    }

    return path.join(root, ...pathStr.split("/"));
}
