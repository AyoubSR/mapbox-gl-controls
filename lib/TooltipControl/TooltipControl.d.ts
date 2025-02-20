import { LngLat, MapLayerEventType, MapMouseEvent } from 'mapbox-gl';
import Base from '../Base/Base';
interface TooltipControlOptions {
    /** Triggered each time mouse moved over `layer` option. */
    getContent: (event: MapMouseEvent) => string;
    /** Layer id to show the tooltip on hover. If not specified, tooltip will be shown for whole map container */
    layer?: string;
}
export default class TooltipControl extends Base {
    layer?: string;
    getContent: (event: MapMouseEvent) => string;
    container: HTMLDivElement;
    eventShow: keyof MapLayerEventType;
    eventHide: keyof MapLayerEventType;
    lngLat?: LngLat;
    cursorStyle: string;
    constructor(options: TooltipControlOptions);
    show(): void;
    hide(): void;
    move(event: MapMouseEvent): void;
    updatePosition(): void;
    onAddControl(): void;
    onRemoveControl(): void;
}
export {};
