import { Map } from 'mapbox-gl';
import Button from '../Button/Button';
declare class Base {
    node: HTMLDivElement;
    map: Map;
    constructor();
    addButton(...buttons: Button[]): void;
    addClassName(className: string): void;
    removeClassName(className: string): void;
    onAddControl(): void;
    onRemoveControl(): void;
    onAdd(map: Map): HTMLDivElement;
    onRemove(): void;
}
export default Base;
