import { LngLat } from 'mapbox-gl';
import { BaseMode, Cursor, Visibility } from '../types';
import icon from '../../icons/ts/move';
import Button from '../../Button/Button';
class MoveMode extends BaseMode {
    constructor(map, picture, onUpdate) {
        super(map, picture, onUpdate);
        this.onPointerLeave = () => {
            this.map.getCanvas().style.cursor = Cursor.Default;
        };
        this.onPointerEnter = this.onPointerEnter.bind(this);
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        this.map.on('mouseenter', this.picture.asFillLayer.id, this.onPointerEnter);
        this.map.on('mouseleave', this.picture.asFillLayer.id, this.onPointerLeave);
        this.map.on('mousedown', this.picture.asFillLayer.id, this.onPointerDown);
    }
    static get button() {
        return (new Button()).setIcon(icon());
    }
    onPointerEnter() {
        this.map.getCanvas().style.cursor = Cursor.Move;
    }
    onPointerDown(event) {
        event.preventDefault();
        this.startPosition = event.lngLat;
        this.map.getCanvas().style.cursor = Cursor.Grabbing;
        this.map.on('mousemove', this.onPointerMove);
        this.map.setLayoutProperty(this.picture.asLineLayer.id, 'visibility', Visibility.None);
        document.addEventListener('pointerup', this.onPointerUp, { once: true });
    }
    onPointerMove(event) {
        if (!this.startPosition)
            throw Error('start position is expected');
        const currentPosition = event.lngLat;
        const deltaLng = this.startPosition.lng - currentPosition.lng;
        const deltaLat = this.startPosition.lat - currentPosition.lat;
        this.onUpdate(this.picture.position.map((p) => new LngLat(p.lng - deltaLng, p.lat - deltaLat)));
        this.startPosition = currentPosition;
    }
    onPointerUp() {
        this.map.getCanvas().style.cursor = Cursor.Move;
        this.map.off('mousemove', this.onPointerMove);
        this.map.setLayoutProperty(this.picture.asLineLayer.id, 'visibility', Visibility.Visible);
    }
    destroy() {
        this.startPosition = undefined;
        this.map.getCanvas().style.cursor = Cursor.Default;
        this.map.off('mousemove', this.onPointerMove);
        this.map.off('mouseenter', this.picture.asFillLayer.id, this.onPointerEnter);
        this.map.off('mouseleave', this.picture.asFillLayer.id, this.onPointerLeave);
        this.map.off('mousedown', this.picture.asFillLayer.id, this.onPointerDown);
        document.removeEventListener('pointerup', this.onPointerUp);
    }
}
export default MoveMode;
//# sourceMappingURL=MoveMode.js.map