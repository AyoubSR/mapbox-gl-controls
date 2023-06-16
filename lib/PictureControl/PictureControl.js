var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Base from '../Base/Base';
import Button from '../Button/Button';
import iconImage from '../icons/ts/image';
import fileInputNode from './helpers/fileInputNode';
import { fromUrl, fromFile } from './loader';
import { MoveMode, ResizeMode, RotateMode } from './modes';
const modes = [MoveMode, ResizeMode, RotateMode];
export default class PictureControl extends Base {
    constructor() {
        super();
        this.pictures = [];
        this.buttons = [];
        this.addClassName('mapbox-control-picture');
        this.addUpload();
        modes.forEach((mode) => {
            const button = mode.button.setDisabled(true);
            button.onClick(() => {
                this.deselectMode();
                this.selectMode(button, mode);
            });
            this.addButton(button);
            this.buttons.push(button);
        });
        this.redraw = this.redraw.bind(this);
        this.update = this.update.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        this.keyDownListener = this.keyDownListener.bind(this);
    }
    redraw() {
        this.deselectPicture();
        this.pictures.forEach((picture) => this.drawPicture(picture));
    }
    onMapClick(event) {
        var _a;
        const pictureFillLayersId = this.pictures.map((p) => p.asFillLayer.id);
        const features = this.map.queryRenderedFeatures(event.point, { layers: pictureFillLayersId });
        if (features.length) {
            this.selectPicture((_a = features[0].properties) === null || _a === void 0 ? void 0 : _a.id);
        }
        else if (this.activePicture) {
            // deselect on outside click with extra padding to exclude knobs controls
            const padding = 10;
            const { x, y } = event.point;
            const bbox = [[x - padding, y - padding], [x + padding, y + padding]];
            const features = this.map.queryRenderedFeatures(bbox, { layers: pictureFillLayersId });
            if (!features.length) {
                this.deselectPicture();
            }
        }
    }
    keyDownListener(event) {
        if (event.key === 'Escape') {
            this.deselectPicture();
        }
    }
    addUpload() {
        const fileInput = fileInputNode();
        const button = new Button();
        button.setIcon(iconImage());
        button.onClick(() => fileInput.click());
        fileInput.addEventListener('change', () => {
            if (!fileInput.files)
                return;
            Array.from(fileInput.files).forEach((file) => __awaiter(this, void 0, void 0, function* () {
                yield this.addPicture(file);
            }));
        });
        this.addButton(button);
        this.node.appendChild(fileInput);
    }
    addPicture(data, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let picture;
            if (typeof data === 'string') {
                picture = yield fromUrl(this.map, data);
            }
            else if (data) {
                picture = yield fromFile(this.map, data);
            }
            else {
                throw Error('file or url is required');
            }
            if (options.position) {
                picture.position = options.position;
            }
            this.pictures.push(picture);
            this.drawPicture(picture);
            this.map.fire('picture.add', picture);
            return picture;
        });
    }
    drawPicture(picture) {
        this.map.addSource(picture.imageSource.id, picture.imageSource.source);
        this.map.addSource(picture.polygonSource.id, picture.polygonSource.source);
        this.map.addSource(picture.pointSource.id, picture.pointSource.source);
        this.map.addLayer(picture.asRasterLayer);
        this.map.addLayer(picture.asFillLayer);
    }
    selectPicture(pictureId) {
        var _a, _b;
        const picture = this.pictures.find((p) => p.id === pictureId);
        if (picture.locked) {
            return; // do not select locked picture
        }
        if (((_a = this.activePicture) === null || _a === void 0 ? void 0 : _a.id) === pictureId) {
            return; // selected the same picture
        }
        if (((_b = this.activePicture) === null || _b === void 0 ? void 0 : _b.id) !== pictureId) {
            this.deselectPicture(); // selected new picture, so deselect previous one
        }
        this.activePicture = picture;
        this.buttons.forEach((button) => button.setDisabled(false));
        this.map.addLayer(this.activePicture.asLineLayer);
        this.map.fire('picture.select', this.activePicture);
        document.addEventListener('keydown', this.keyDownListener);
    }
    deselectPicture() {
        if (!this.activePicture)
            return;
        this.deselectMode();
        this.map.removeLayer(this.activePicture.asLineLayer.id);
        this.map.fire('picture.deselect', this.activePicture);
        this.activePicture = undefined;
        this.buttons.forEach((button) => button.setDisabled(true));
        document.removeEventListener('keydown', this.keyDownListener);
    }
    selectMode(button, ModeClass) {
        if (!this.activePicture) {
            throw Error('no picture to for active mode');
        }
        this.activeButton = button.setActive(true);
        this.activeMode = new ModeClass(this.map, this.activePicture, this.update);
    }
    deselectMode() {
        if (this.activeMode) {
            this.activeMode.destroy();
            this.activeMode = undefined;
        }
        if (this.activeButton) {
            this.activeButton.setActive(false);
            this.activeButton = undefined;
        }
    }
    update(position) {
        const selectedPicture = this.activePicture;
        if (!selectedPicture)
            throw Error('no picture to update');
        selectedPicture.position = position;
        this.map.getSource(selectedPicture.imageSource.id).setCoordinates(selectedPicture.coordinates);
        this.map.getSource(selectedPicture.polygonSource.id).setData(selectedPicture.asPolygon);
        this.map.getSource(selectedPicture.pointSource.id).setData(selectedPicture.asPoints);
        this.map.fire('picture.update', this.activePicture);
    }
    setLock(pictureId, value) {
        const picture = this.pictures.find((i) => i.id === pictureId);
        if (!picture)
            throw Error(`picture with id ${pictureId} doesn't exist`);
        picture.locked = value;
    }
    onAddControl() {
        this.mapContainer = this.map.getContainer();
        this.map.on('style.load', this.redraw);
        this.map.on('click', this.onMapClick);
    }
    onRemoveControl() {
        this.deselectPicture();
        this.map.off('style.load', this.redraw);
        this.map.off('click', this.onMapClick);
    }
}
//# sourceMappingURL=PictureControl.js.map