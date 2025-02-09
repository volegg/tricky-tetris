type Translate = (key: TranslationKeys, props?: TranslationProps) => string;

export let t: Translate;

setDictionary();

export function setDictionary(newDictionary: Partial<TranslationDictionary> = {}) {
    const dictionary: Readonly<TranslationDictionary> = {
        pressAnyButton: 'Press any button',
        ...newDictionary,
    };

    t = function translate(key: TranslationKeys, props?: TranslationProps) {
        let text = dictionary[key];

        if (!text) {
            console.error(`Missing translation key = ${key}`);

            return key;
        }

        if (!props) {
            return text;
        }

        try {
            Object.keys(props).forEach((propName) => {
                text = text.replace(new RegExp(`{${propName}}`), String(props[propName]));
            });
        } catch (ex: unknown) {
            console.error(ex);
            text = key;
        }

        return text;
    };
}
