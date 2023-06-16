import iconPointer from '../icons/ts/pointer';
import Base from '../Base/Base';
import Button from '../Button/Button';
export default class CompassControl extends Base {
    constructor(options) {
        var _a;
        super();
        this.buttonCompass = new Button();
        this.instant = (_a = options === null || options === void 0 ? void 0 : options.instant) !== null && _a !== void 0 ? _a : true;
        this.syncRotate = this.syncRotate.bind(this);
    }
    insert() {
        this.addClassName('mapbox-compass');
        if (!this.instant)
            this.node.hidden = true;
        this.buttonCompass
            .setIcon(iconPointer())
            .onClick(() => {
            this.map.easeTo({ bearing: 0, pitch: 0 });
        });
        this.addButton(this.buttonCompass);
    }
    onAddControl() {
        this.insert();
        this.syncRotate();
        this.map.on('rotate', this.syncRotate);
    }
    syncRotate() {
        const angle = this.map.getBearing() * (-1);
        if (!this.instant) {
            this.node.hidden = angle === 0;
        }
        this.buttonCompass.icon.style.transform = `rotate(${angle}deg)`;
    }
}
//# sourceMappingURL=CompassControl.js.map