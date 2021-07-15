import {AxiosRequestConfig} from 'axios';

export interface OverlayItem {
  header: string;
  message: string;
  image?: string;
  animationCode?: string;
}

export interface Overlay {
  path: string;
  overlay: OverlayItem;
}

export interface OverlayService {
  getOverlays: (e?: AxiosRequestConfig) => void;
}

export type OverlayServiceHook = (e?: AxiosRequestConfig) => OverlayService;

export type ShowOverlay =
  /**
   *
   * @param overlay Pass overlay object to show overlay pass null to hide
   * @param mintime minimum time in seconds to show the overlay it will prevent setting null time up;
   * @param timeout timeout time in seconds set this if you want to auto hide overlay .
   *
   */
  (overlay: OverlayItem | null, mintime?: number, timeout?: number) => void;
