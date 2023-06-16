import { Map, MapMouseEvent } from 'mapbox-gl';
import { BaseMode, OnUpdate } from '../types';
import Button from '../../Button/Button';
import Picture from '../Picture';
declare class ResizeMode extends BaseMode {
    currentIndex?: number;
    static get button(): Button;
    constructor(map: Map, picture: Picture, onUpdate: OnUpdate);
    onPointerDown(event: any): void;
    onPointerMove(event: MapMouseEvent): void;
    onPointerUp(): void;
    destroy(): void;
}
export default ResizeMode;
