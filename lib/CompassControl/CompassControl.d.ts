import Base from '../Base/Base';
import Button from '../Button/Button';
interface CompassControlOptions {
    /** Show compass if bearing is 0 */
    instant?: boolean;
}
export default class CompassControl extends Base {
    buttonCompass: Button;
    instant: boolean;
    constructor(options?: CompassControlOptions);
    insert(): void;
    onAddControl(): void;
    syncRotate(): void;
}
export {};
