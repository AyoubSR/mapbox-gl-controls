import { Map, LngLat, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { BaseMode, OnUpdate } from '../types';
import Picture from '../Picture';
import Button from '../../Button/Button';
declare class MoveMode extends BaseMode {
    startPosition?: LngLat;
    static get button(): Button;
    constructor(map: Map, picture: Picture, onUpdate: OnUpdate);
    onPointerEnter(): void;
    onPointerDown(event: MapLayerMouseEvent): void;
    onPointerMove(event: MapMouseEvent): void;
    onPointerUp(): void;
    onPointerLeave: () => void;
    destroy(): void;
}
export default MoveMode;
