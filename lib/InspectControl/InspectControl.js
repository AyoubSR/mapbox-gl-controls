import Base from '../Base/Base';
import Button from '../Button/Button';
import iconInspect from '../icons/ts/inspect';
import popupTemplate from './popupTemplate';
export default class InspectControl extends Base {
    constructor(options) {
        super();
        this.isInspecting = false;
        this.console = options === null || options === void 0 ? void 0 : options.console;
        this.isInspecting = false;
        this.buttonInspect = new Button();
    }
    insert() {
        this.addClassName('mapbox-control-inspect');
        this.buttonInspect
            .setIcon(iconInspect())
            .onClick(() => {
            if (this.isInspecting) {
                this.inspectingOff();
            }
            else {
                this.inspectingOn();
            }
        });
        this.addButton(this.buttonInspect);
        this.mapClickListener = this.mapClickListener.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
    }
    inspectingOn() {
        this.isInspecting = true;
        this.buttonInspect.setActive(true);
        this.map.on('click', this.mapClickListener);
        this.map.on('move', this.updatePosition);
        this.map.getCanvas().style.cursor = 'pointer';
    }
    inspectingOff() {
        this.isInspecting = false;
        this.buttonInspect.setActive(false);
        this.map.off('click', this.mapClickListener);
        this.map.off('move', this.updatePosition);
        this.map.getCanvas().style.cursor = '';
        this.removePopup();
    }
    getFeatures(event) {
        const selectThreshold = 3;
        const queryBox = [
            [event.point.x - selectThreshold, event.point.y + selectThreshold],
            [event.point.x + selectThreshold, event.point.y - selectThreshold], // top right (NE)
        ];
        return this.map.queryRenderedFeatures(queryBox);
    }
    addPopup(features) {
        this.popupNode = popupTemplate(features);
        this.map.getContainer().appendChild(this.popupNode);
        this.updatePosition();
        if (this.console) {
            console.log(features);
        }
    }
    removePopup() {
        if (!this.popupNode)
            return;
        this.map.getContainer().removeChild(this.popupNode);
        this.popupNode = undefined;
    }
    updatePosition() {
        if (!this.lngLat)
            return;
        if (!this.popupNode)
            return;
        const canvasRect = this.map.getCanvas().getBoundingClientRect();
        const pos = this.map.project(this.lngLat);
        this.popupNode.style.left = `${pos.x - canvasRect.left}px`;
        this.popupNode.style.top = `${pos.y - canvasRect.top}px`;
    }
    mapClickListener(event) {
        this.lngLat = event.lngLat;
        const features = this.getFeatures(event);
        this.removePopup();
        this.addPopup(features);
    }
    onAddControl() {
        this.insert();
    }
    onRemoveControl() {
        this.inspectingOff();
    }
}
//# sourceMappingURL=InspectControl.js.map