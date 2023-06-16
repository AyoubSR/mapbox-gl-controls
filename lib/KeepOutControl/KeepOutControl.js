import Base from '../Base/Base';
import Button from '../Button/Button';
import iconKeepOut from '../icons/ts/inspect';
export default class KeepOutControl extends Base {
    constructor() {
        super();
        this.container = document.createElement('div');
        this.node = document.createElement('div');
        this.lngLat = undefined;
        this.cursorStyle = '';
        this.buttonKeepOut = new Button();
    }
    onAddControl() {
        console.log('add control');
        this.addClassName('mapbox-control-keepout');
        this.buttonKeepOut
            .setIcon(iconKeepOut())
            .onClick(() => {
            console.log('click');
        });
        this.addButton(this.buttonKeepOut);
    }
    onRemoveControl() {
        console.log('remove control');
    }
}
//# sourceMappingURL=KeepOutControl.js.map