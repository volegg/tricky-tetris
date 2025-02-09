const paths = require("./paths");
const fs = require("fs");

function getVersion() {
    const companyName = "http://oleggnet.dev/";
    const isDevMode = process.env.NODE_ENV === "development";

    const pkg = JSON.parse(fs.readFileSync(paths.root("package.json"), "utf-8"));
    const numOfVersions = (pkg.version || "0.0.1")
        .split(".")
        .map(x => + x);
    const mainVersion = numOfVersions
        .slice(0, 3)
        .join(".");
    const buildVersion = parseInt(new Date().toJSON().replace(/\D/g, "").substring(2, 12), 10);
    const version = mainVersion + (isDevMode
        ? ".build" + buildVersion
        : "");
    const name = pkg
        .name
        .toUpperCase()
        .replace(/-/g, " ").trim();

    return {
        companyName,
        banner: getBanner(name, isDevMode
            ? version
            : "ver. " + version),
        name,
        version,
        major: numOfVersions[0],
        minor: numOfVersions[1],
        patch: numOfVersions[2],
        build: buildVersion
    };
}

function getBanner(name, version) {
    let len = name.length;
    let padName = 0;
    let padVersion = Math.abs(Math.floor((name.length - version.length) * 0.5));

    if (version.length > name.length) {
        len = version.length;
        padName = padVersion;
        padVersion = 0;
    }

    const getLine = setTextPad(2);
    const emptyLine = getLine(" ".repeat(len));

    return emptyLine + "\n" + getLine(name, padName) + "\n" + getLine(version, padVersion) + "\n" + emptyLine;
}

function setTextPad(basePadNum) {
    const padText = "\t".repeat(basePadNum);

    return function getTextLine(text, pad) {
        return padText + " ".repeat(pad) + text + " ".repeat(pad) + padText;
    };
}

module.exports = {
    version: {
        ...getVersion()
    }
};
