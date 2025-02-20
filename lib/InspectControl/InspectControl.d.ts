import { LngLat, MapboxGeoJSONFeature, MapMouseEvent } from 'mapbox-gl';
import Base from '../Base/Base';
import Button from '../Button/Button';
interface InspectControlOptions {
    /** Log inspected features to console */
    console?: boolean;
}
export default class InspectControl extends Base {
    console?: boolean;
    popupNode?: HTMLDivElement;
    lngLat?: LngLat;
    isInspecting: boolean;
    buttonInspect: Button;
    constructor(options?: InspectControlOptions);
    insert(): void;
    inspectingOn(): void;
    inspectingOff(): void;
    getFeatures(event: MapMouseEvent): MapboxGeoJSONFeature[];
    addPopup(features: MapboxGeoJSONFeature[]): void;
    removePopup(): void;
    updatePosition(): void;
    mapClickListener(event: MapMouseEvent): void;
    onAddControl(): void;
    onRemoveControl(): void;
}
export {};
