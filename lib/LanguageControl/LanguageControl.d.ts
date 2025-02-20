import Base from '../Base/Base';
interface LanguageControlOptions {
    /** (supported languages)[https://docs.mapbox.com/help/troubleshooting/change-language/] */
    supportedLanguages?: string[];
    /** one of the supported languages to apply */
    language?: string;
    /** Accepts language and returns language field. By default fields are `name_LANGUAGE` and `name` for multi language (mul) */
    getLanguageField?: (language: string) => string;
    /** Array of layer id to exclude from localization */
    excludedLayerIds?: string[];
}
export default class LanguageControl extends Base {
    supportedLanguages: string[];
    language?: string;
    getLanguageField: (language: string) => string;
    excludedLayerIds: string[];
    constructor(options?: LanguageControlOptions);
    onAddControl(): void;
    onRemoveControl(): void;
    styleChangeListener(): void;
    setLanguage(lang?: string): void;
    browserLanguage(): string;
}
export {};
