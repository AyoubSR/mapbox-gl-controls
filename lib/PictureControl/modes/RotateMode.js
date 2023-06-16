import { LngLat } from 'mapbox-gl';
import bearing from '@turf/bearing';
import distance from '@turf/distance';
import destination from '@turf/destination';
import { BaseMode, Cursor, Visibility } from '../types';
import icon from '../../icons/ts/rotate';
import Button from '../../Button/Button';
class RotateMode extends BaseMode {
    constructor(map, picture, onUpdate) {
        super(map, picture, onUpdate);
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        // this.map.addLayer(this.picture.asCircleLayer);
        // this.map.on('mousedown', this.picture.asCircleLayer.id, this.onPointerDown);
        this.map.on('mousedown', this.picture.asFillLayer.id, this.onPointerDown);
    }
    static get button() {
        return (new Button()).setIcon(icon());
    }
    onPointerDown(event) {
        event.preventDefault();
        console.log('onPointerDown');
        if (!this.picture)
            return;
        this.map.getCanvas().style.cursor = Cursor.Grabbing;
        this.startPosition = event.lngLat;
        this.originalCenter = this.picture.centroid;
        this.originalCoords = this.picture.coordinates;
        this.map.on('mousemove', this.onPointerMove);
        // this.map.setLayoutProperty(this.picture.asCircleLayer.id, 'visibility', Visibility.None);
        this.map.setLayoutProperty(this.picture.asLineLayer.id, 'visibility', Visibility.None);
        document.addEventListener('pointerup', this.onPointerUp, { once: true });
    }
    onPointerMove(event) {
        console.log('rotateMode??');
        // if (!this.startPosition) throw Error('start position is expected');
        // const currentPosition = event.lngLat;
        // const coords = this.picture.position.map((p) => p.toArray());
        // console.log(coords);
        // console.log(this.picture.centroid);
        // console.log(currentPosition.toArray());
        const draggedBearing = bearing(this.picture.centroid, [event.lngLat.lng, event.lngLat.lat]);
        const polyCoords = [];
        this.originalCoords.forEach((coords, index) => {
            const distanceFromCenter = distance(this.originalCenter, coords);
            const bearingFromCenter = bearing(this.originalCenter, coords);
            const newPoint = destination(this.originalCenter, distanceFromCenter, bearingFromCenter + draggedBearing);
            polyCoords.push(newPoint.geometry.coordinates);
        });
        this.onUpdate(polyCoords.map((p) => new LngLat(p[0], p[1])));
        // this.startPosition = currentPosition;
    }
    onPointerUp() {
        this.originalCenter = false;
        this.map.getCanvas().style.cursor = Cursor.Grabbing;
        this.map.off('mousemove', this.onPointerMove);
        // this.map.setLayoutProperty(this.picture.asCircleLayer.id, 'visibility', Visibility.Visible);
        this.map.setLayoutProperty(this.picture.asLineLayer.id, 'visibility', Visibility.Visible);
    }
    destroy() {
        this.map.getCanvas().style.cursor = Cursor.Default;
        this.map.off('mousemove', this.onPointerMove);
        this.map.off('mousedown', this.picture.asFillLayer.id, this.onPointerDown);
        document.removeEventListener('pointerup', this.onPointerUp);
        // this.map.removeLayer(this.picture.asCircleLayer.id);
    }
}
export default RotateMode;
//# sourceMappingURL=RotateMode.js.map