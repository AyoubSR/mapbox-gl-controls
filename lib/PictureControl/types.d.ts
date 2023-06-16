import { LngLat, Map } from 'mapbox-gl';
import Button from '../Button/Button';
import Picture from './Picture';
export declare type PicturePosition = LngLat[];
export declare enum Cursor {
    Default = "",
    Move = "move",
    Grabbing = "grabbing"
}
export declare type OnUpdate = (position: PicturePosition) => void;
export declare class BaseMode {
    map: Map;
    picture: Picture;
    onUpdate: OnUpdate;
    static button: Button;
    constructor(map: Map, picture: Picture, onUpdate: OnUpdate);
    destroy(): void;
}
export declare enum Visibility {
    Visible = "visible",
    None = "none"
}
