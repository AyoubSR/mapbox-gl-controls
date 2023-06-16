import { Map } from 'mapbox-gl';
import Picture from './Picture';
export declare function fromFile(map: Map, file: File): Promise<Picture>;
export declare function fromUrl(map: Map, url: string): Promise<Picture>;
