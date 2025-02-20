import { MapMouseEvent, Marker } from 'mapbox-gl';
import type { Position } from 'geojson';
import { Units } from '@turf/helpers';
import Base from '../Base/Base';
import Button from '../Button/Button';
interface RulerControlOptions {
    /** Any units [@turf/distance](https://github.com/Turfjs/turf/tree/master/packages/turf-distance) supports */
    units?: Units;
    /** Array of fonts */
    font?: string[];
    /** Label font size */
    fontSize?: number;
    /** Label font halo size */
    fontHalo?: number;
    /** Accepts number and returns label. Can be used to convert value to any measuring units */
    labelFormat?: (n: number) => string;
    /** Color of ruler lines */
    mainColor?: string;
    /** Color of halo and inner marker background. */
    secondaryColor?: string;
    /** Array of anchor positions */
    textVariableAnchor?: string[];
    /** Is allowed to overlap labels */
    textAllowOverlap?: boolean;
    /** Width and Height of the marker in `px` */
    markerNodeSize?: number;
    /** Width of the marker's border in `px` */
    markerNodeBorderWidth?: number;
}
export default class RulerControl extends Base {
    isMeasuring: boolean;
    markers: Marker[];
    coordinates: Position[];
    labels: string[];
    units: Units;
    font: string[];
    fontSize: number;
    fontHalo: number;
    textVariableAnchor: string[];
    textAllowOverlap: boolean;
    markerNodeSize: string;
    markerNodeBorderWidth: string;
    labelFormat: (n: number) => string;
    mainColor: string;
    secondaryColor: string;
    buttonRuler: Button;
    constructor(options?: RulerControlOptions);
    insert(): void;
    draw(): void;
    measuringOn(): void;
    measuringOff(): void;
    mapClickListener(event: MapMouseEvent): void;
    updateSource(): void;
    updateLabels(): void;
    getMarkerNode(): HTMLDivElement;
    onAddControl(): void;
    onRemoveControl(): void;
}
export {};
