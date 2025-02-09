// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyType = any;

declare const BUILD_OPTIONS: {
    prod: boolean;
    dev: boolean;
    version: {
        companyName: string;
        banner: string;
        name: string;
        version: string;
        major: number;
        minor: number;
        patch: number;
        build: number;
    };
};
