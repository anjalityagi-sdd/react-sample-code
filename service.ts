/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {isMockActive} from 'src/helpers/mockHelper';
import useAxios from 'src/hooks/useAxios';
import {Overlay, OverlayServiceHook} from './interfaces';
import initializeMock from './mock';
import {overlayListState} from './states';
import {Response} from 'src/types';

const useOverlaysService: OverlayServiceHook = props => {
  const [overlayList, setOverlayList] = useRecoilState(overlayListState);
  const [axios, header] = useAxios(props);
  if (isMockActive('overlay')) {
    initializeMock(axios);
  }
  const getOverlays = useCallback(
    config => {
      axios
        .get<Response<Overlay[]>>('Master/Overlay', config)
        .then(response => {
          if (!overlayList.length) {
            setOverlayList(response.data.data);
          }
        })
        .catch(console.error);
    },
    [header],
  );
  return {getOverlays};
};

export default useOverlaysService;
