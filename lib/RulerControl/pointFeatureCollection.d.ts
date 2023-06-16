import type { Position } from 'geojson';
declare type FeatureCollection = GeoJSON.FeatureCollection;
export default function pointFeatureCollection(coordinates?: Position[], labels?: string[]): FeatureCollection;
export {};
