import centroid from '@turf/centroid';
class Picture {
    constructor(options) {
        this.id = options.id;
        this.url = options.url;
        this.width = options.width;
        this.height = options.height;
        this.position = options.position;
        this.locked = false;
    }
    get coordinates() {
        return this.position.map((p) => [p.lng, p.lat]);
    }
    get asPolygon() {
        return {
            type: 'Feature',
            properties: { id: this.id },
            geometry: {
                type: 'Polygon',
                coordinates: [[...this.coordinates, this.coordinates[0]]],
            },
        };
    }
    get asPoints() {
        return {
            type: 'FeatureCollection',
            features: this.coordinates.map((point, i) => ({
                type: 'Feature',
                properties: { index: i },
                geometry: { type: 'Point', coordinates: point },
            })),
        };
    }
    get imageSource() {
        return {
            id: `${this.id}-raster`,
            source: { type: 'image', url: this.url, coordinates: this.coordinates },
        };
    }
    get polygonSource() {
        return {
            id: `${this.id}-polygon`,
            source: { type: 'geojson', data: this.asPolygon },
        };
    }
    get pointSource() {
        return {
            id: `${this.id}-points`,
            source: { type: 'geojson', data: this.asPoints },
        };
    }
    get asRasterLayer() {
        return {
            id: `${this.id}-raster`,
            type: 'raster',
            source: this.imageSource.id,
            paint: { 'raster-fade-duration': 0, 'raster-opacity': 0.5 },
        };
    }
    get asFillLayer() {
        return ({
            id: `${this.id}-fill`,
            type: 'fill',
            source: this.polygonSource.id,
            paint: { 'fill-opacity': 0 },
        });
    }
    get asLineLayer() {
        return ({
            id: `${this.id}-contour`,
            type: 'line',
            source: `${this.id}-polygon`,
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-dasharray': [0.2, 2],
                'line-color': 'rgb(61, 90, 254)',
                'line-width': 2,
            },
        });
    }
    get asCircleLayer() {
        return ({
            id: `${this.id}-circle`,
            type: 'circle',
            source: `${this.id}-points`,
            paint: {
                'circle-radius': 5,
                'circle-color': 'rgb(61, 90, 254)',
                'circle-stroke-width': 3,
                'circle-stroke-color': '#fff',
            },
        });
    }
    get centroid() {
        return centroid(this.asPolygon);
    }
    oppositePointTo(index) {
        if (index === 0)
            return 2;
        if (index === 1)
            return 3;
        if (index === 2)
            return 0;
        if (index === 3)
            return 1;
        throw Error('invalid corner index');
    }
}
export default Picture;
//# sourceMappingURL=Picture.js.map