import { LngLat, MapLayerEventType, MapMouseEvent } from 'mapbox-gl';
import Base from '../Base/Base';
import Button from '../Button/Button';
import iconKeepOut from '../icons/ts/inspect';

interface KeepOutControlOptions {
  /** Triggered each time mouse moved over `layer` option. */
  getContent: (event: MapMouseEvent) => string;
  /** Layer id to show the tooltip on hover. If not specified, tooltip will be shown for whole map container */
  layer?: string;
}

export default class KeepOutControl extends Base {
  container: HTMLDivElement;
  lngLat?: LngLat;
  cursorStyle: string;
  buttonKeepOut: Button;

  constructor() {
    super();
    this.container = document.createElement('div');
    this.node = document.createElement('div');
    this.lngLat = undefined;
    this.cursorStyle = '';
    this.buttonKeepOut = new Button();
  }



  onAddControl() {
    console.log('add control')
    this.addClassName('mapbox-control-keepout');
    this.buttonKeepOut
      .setIcon(iconKeepOut())
      .onClick(() => {
        console.log('click')
      });
    this.addButton(this.buttonKeepOut);
  }

  onRemoveControl() {
    console.log('remove control')
  }
}
