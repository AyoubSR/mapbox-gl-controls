import Base from '../Base/Base';
import Button from '../Button/Button';
export default class StylesControl extends Base {
    constructor(options) {
        var _a;
        super();
        this.styles = (_a = options === null || options === void 0 ? void 0 : options.styles) !== null && _a !== void 0 ? _a : this.defaultOptions;
        this.onChange = options === null || options === void 0 ? void 0 : options.onChange;
        this.buttons = [];
    }
    insert() {
        this.addClassName('mapbox-control-styles');
        this.styles.forEach((style) => {
            const button = new Button();
            button.setText(style.label);
            button.onClick(() => {
                if (button.isActive())
                    return;
                this.map.setStyle(style.styleUrl);
                if (this.onChange)
                    this.onChange(style);
            });
            this.buttons.push(button);
            this.addButton(button);
        });
        this.map.on('styledata', () => {
            this.buttons.forEach((button) => {
                button.setActive(false);
            });
            const styleNames = this.styles.map((style) => style.styleName);
            const styleName = this.map.getStyle().name;
            if (!styleName)
                throw Error('style must have name');
            const currentStyleIndex = styleNames.indexOf(styleName);
            if (currentStyleIndex !== -1) {
                const currentButton = this.buttons[currentStyleIndex];
                currentButton.setActive(true);
            }
        });
    }
    get defaultOptions() {
        return [
            {
                label: 'Streets',
                styleName: 'Mapbox Streets',
                styleUrl: 'mapbox://styles/mapbox/streets-v11',
            }, {
                label: 'Satellite',
                styleName: 'Mapbox Satellite Streets',
                styleUrl: 'mapbox://sprites/mapbox/satellite-streets-v11',
            },
        ];
    }
    onAddControl() {
        this.insert();
    }
}
//# sourceMappingURL=StylesControl.js.map