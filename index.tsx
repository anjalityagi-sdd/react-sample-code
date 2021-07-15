import styled from 'styled-components';
import {HTMLMotionProps, motion} from 'framer-motion';
import ImageBox from 'src/icons/ImageBox';
import {useCallback, useEffect, useRef} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import Typography from 'src/components/Typography';
import Box from 'src/components/Box';
import TopHeader from 'src/components/TopHeader';
import {ShowOverlay} from './interfaces';
import {overlayListState, overlayState} from './states';
import useOverlaysService from './service';
import {useHistory} from 'react-router-dom';
import * as H from 'history';

//style the overlaywrapper
const OverlayWrapper = styled(motion.div)<HTMLMotionProps<'div'>>`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  z-index: 10;
  overflow: auto;
`;

const useOverlay: () => ShowOverlay = () => {
  const [_, setOverlay] = useRecoilState(overlayState);
  const minTimeout = useRef(0);
  const interval = useRef<NodeJS.Timeout>();
  const timeout = useRef<NodeJS.Timeout>();
  const closeAfterTimeout = useRef(false);
  useEffect(() => {
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);
  return useCallback(
    (e, mintime, tout) => {
      if (!e) {
        if (minTimeout.current <= 0) {
          setOverlay(e);
        } else {
          closeAfterTimeout.current = true;
        }
      } else {
        setOverlay(e);
        closeAfterTimeout.current = false;
        if (mintime) {
          minTimeout.current = mintime;
          interval.current = setInterval(() => {
            minTimeout.current = minTimeout.current - 1;
            if (minTimeout.current === 0 && interval.current) {
              if (closeAfterTimeout.current) {
                setOverlay(null);
              }
              clearTimeout(interval.current);
            }
          }, 1000);
        }
        if (tout) {
          timeout.current = setTimeout(
            () => setOverlay(null),
            (mintime && mintime > tout ? mintime : tout) * 1000,
          );
        }
      }
    },
    [minTimeout, closeAfterTimeout, timeout, interval, setOverlay],
  );
};

const OverlayComponent: React.FC = () => {
  const overlay = useRecoilValue(overlayState);
  const showOverlay = useOverlay();
  const overlayList = useRecoilValue(overlayListState);
  const {getOverlays} = useOverlaysService();
  const {listen, location} = useHistory();
  useEffect(() => {
    if (!overlayList.length) {
      getOverlays();
    }
  }, [getOverlays, overlayList]);
  useEffect(() => {
    return listen((loc: any, type: H.Action) => {
      if (type === 'PUSH' && overlayList.length) {
        showOverlay(
          overlayList.find(m => m.path === loc?.pathname)?.overlay || null,
          undefined,
          5,
        );
      }
    });
  }, [listen, showOverlay, overlayList]);
  useEffect(() => {
    //get the path of overlay
    showOverlay(
      overlayList.find(m => m.path === location?.pathname)?.overlay || null,
      undefined,
      5,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlayList]);
  useEffect(() => {
    const body = document.getElementById('app-body');
    if (overlay && body) {
      body.className = `${body.className} no-overflow`;
    } else if (body) {
      body.className = body.className.replace('no-overflow', '');
      window.scrollTo(0, 0);
    }
  }, [overlay]);
  if (!overlay) {
    return null;
  }
  const {header, message, animationCode, image} = overlay;
  return (
    <OverlayWrapper>
      <TopHeader>
        <Box pt={1.5}>
          <img src="/logo192.png" width="224" height="33" alt="logo" />
        </Box>
      </TopHeader>
      <Box p={1.5} display="flex" justifyContent="center">
        <Box maxWidth={788} width="100%">
          <Typography variant="body1" color="primary" align="center">
            {header}
          </Typography>
          <Typography variant="h1" color="primary" align="center">
            {message}
          </Typography>
          <br />
          <br />
          <br />
          {animationCode || image ? <ImageBox /> : null}
        </Box>
      </Box>
    </OverlayWrapper>
  );
};

export {OverlayComponent as default, useOverlay};
