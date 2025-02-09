/* eslint-disable no-console */
export function initLogger() {
    console.log(
        '%c' + BUILD_OPTIONS.version.banner,
        'background:#7d7d7d;color:#dfdfdf;font-size:12px;font-weight:bold',
    );

    const nativeLog = console.log;
    const nativeWarn = console.warn;
    const nativeError = console.error;

    console.log = (...args: AnyType) => {
        if (BUILD_OPTIONS.dev) {
            nativeLog(...args);
        }
    };

    console.info = console.log;

    console.warn = (...args: AnyType) => {
        if (BUILD_OPTIONS.dev) {
            nativeWarn(...args);
        }
    };

    console.error = (...args: AnyType) => {
        if (BUILD_OPTIONS.dev) {
            nativeError(...args);
        }
    };

    console.log('IS DEV MODE', BUILD_OPTIONS.dev);
}
