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

type Point = [number, number];

type SupportedLanguages = 'en';

type TranslationKeys = 'pressAnyButton';

type TranslationProps = Record<string, number | boolean | string>;

type TranslationDictionary = Record<TranslationKeys, string>;
