import { LngLat } from 'mapbox-gl';
import Base from '../Base/Base';
import Button from '../Button/Button';
export default class KeepOutControl extends Base {
    container: HTMLDivElement;
    lngLat?: LngLat;
    cursorStyle: string;
    buttonKeepOut: Button;
    constructor();
    onAddControl(): void;
    onRemoveControl(): void;
}
