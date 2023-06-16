import { CircleLayer, FillLayer, GeoJSONSourceRaw, ImageSourceRaw, LineLayer, RasterLayer } from 'mapbox-gl';
import type { Feature, FeatureCollection, Point, Polygon } from 'geojson';
import type { PicturePosition } from './types';
interface PictureOptions {
    id: string;
    url: string;
    width: number;
    height: number;
    position: PicturePosition;
}
declare class Picture {
    [x: string]: any;
    id: string;
    url: string;
    width: number;
    height: number;
    position: PicturePosition;
    locked: boolean;
    constructor(options: PictureOptions);
    get coordinates(): number[][];
    get asPolygon(): Feature<Polygon>;
    get asPoints(): FeatureCollection<Point>;
    get imageSource(): {
        id: string;
        source: ImageSourceRaw;
    };
    get polygonSource(): {
        id: string;
        source: GeoJSONSourceRaw;
    };
    get pointSource(): {
        id: string;
        source: GeoJSONSourceRaw;
    };
    get asRasterLayer(): RasterLayer;
    get asFillLayer(): FillLayer;
    get asLineLayer(): LineLayer;
    get asCircleLayer(): CircleLayer;
    get centroid(): import("@turf/helpers").Feature<import("@turf/helpers").Point, import("@turf/helpers").Properties>;
    oppositePointTo(index: number): number;
}
export default Picture;
