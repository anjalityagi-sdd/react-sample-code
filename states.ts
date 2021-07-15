import {atom} from 'recoil';
import {Overlay, OverlayItem} from './interfaces';

const overlayState = atom<OverlayItem | null>({
  key: 'overlay',
  default: null,
});

const overlayListState = atom<Overlay[]>({
  key: 'overlay-list',
  default: [],
});
export {overlayState, overlayListState};
