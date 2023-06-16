import Base from '../Base/Base';
import Button from '../Button/Button';
import { StyleOption } from './types';
interface StylesControlOptions {
    /** Array of style options */
    styles?: StyleOption[];
    /** Triggered on style change */
    onChange?: (style: StyleOption) => void;
}
export default class StylesControl extends Base {
    styles: StyleOption[];
    onChange?: (style: StyleOption) => void;
    buttons: Button[];
    constructor(options?: StylesControlOptions);
    insert(): void;
    get defaultOptions(): StyleOption[];
    onAddControl(): void;
}
export {};
