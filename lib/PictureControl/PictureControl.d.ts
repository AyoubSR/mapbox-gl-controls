import { MapMouseEvent } from 'mapbox-gl';
import Base from '../Base/Base';
import Button from '../Button/Button';
import Picture from './Picture';
import { BaseMode, PicturePosition } from './types';
export default class PictureControl extends Base {
    mapContainer?: HTMLElement;
    pictures: Picture[];
    buttons: Button[];
    activeButton?: Button;
    activeMode?: BaseMode;
    activePicture?: Picture;
    constructor();
    redraw(): void;
    onMapClick(event: MapMouseEvent): void;
    keyDownListener(event: KeyboardEvent): void;
    addUpload(): void;
    addPicture(data: File | string, options?: {
        position?: PicturePosition;
    }): Promise<Picture>;
    drawPicture(picture: Picture): void;
    selectPicture(pictureId: string): void;
    deselectPicture(): void;
    selectMode(button: Button, ModeClass: typeof BaseMode): void;
    deselectMode(): void;
    update(position: PicturePosition): void;
    setLock(pictureId: string, value: boolean): void;
    onAddControl(): void;
    onRemoveControl(): void;
}
