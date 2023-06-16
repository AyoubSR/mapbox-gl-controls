import { Map, LngLat, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { BaseMode, OnUpdate } from '../types';
import Button from '../../Button/Button';
import Picture from '../Picture';
declare class RotateMode extends BaseMode {
    startPosition?: LngLat;
    originalCenter?: any;
    originalCoords?: any;
    static get button(): Button;
    constructor(map: Map, picture: Picture, onUpdate: OnUpdate);
    onPointerDown(event: MapLayerMouseEvent): void;
    onPointerMove(event: MapMouseEvent): void;
    onPointerUp(): void;
    destroy(): void;
}
export default RotateMode;
