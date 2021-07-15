import {AxiosInstance} from 'axios';
import MockAdapter from 'src/helpers/mock';
import {createMockResponse} from 'src/helpers/mockHelper';
import {Overlay} from './interfaces';

const data: Overlay[] = [
  {
    path: '/prelim-question',
    overlay: {
      header: 'Starting Dry Eye Consultation',
      message: 'You’re on your way to conquering dry eye disease',
      image: 'image',
    },
  },
  {
    path: '/prelim-question/1',
    overlay: {
      header: 'You’re not alone',
      message: 'Over 30 million US adults are affected by Dry Eye Disease',
      image: 'image',
    },
  },
  {
    path: '/prelim-question/user-info',
    overlay: {
      header: 'You’re not alone',
      message: 'Over 30 million US adults are affected by Dry Eye Disease',
      image: 'image',
    },
  },
  {
    path: '/patient-symptoms/intro',
    overlay: {
      header: 'Load screen depending on answer',
      message: 'Load screen depending on answer',
      image: 'image',
    },
  },
  {
    path: '/patient-symptoms/symptoms',
    overlay: {
      header: 'Ocular Surface Disease Index© (OSDI©)',
      message:
        'The OSDI is a clinically proven tool to determine the severity of dry eye disease',
      image: 'image',
    },
  },
  {
    path: '/patient-symptoms/symptoms/1',
    overlay: {
      header: 'Message',
      message: 'Intersticial Message',
      image: 'image',
    },
  },
  {
    path: '/patient-symptoms/symptoms/2',
    overlay: {
      header: 'Message',
      message: 'Intersticial Message',
      image: 'image',
    },
  },
  {
    path: '/patient-history',
    overlay: {
      header: '',
      message: 'Now tell us more about your beautiful eyes',
      image: 'image',
    },
  },
  {
    path: '/patient-history/7',
    overlay: {
      header: '',
      message: 'Now tell us more about your general health',
      image: 'image',
    },
  },
  {
    path: '/patient-history/18',
    overlay: {
      header: '',
      message:
        'We are here to take care of the whole you. Dry eye disease is just as emotional as it is physical',
      image: 'image',
    },
  },
  {
    path: '/expectation',
    overlay: {
      header: '',
      message:
        'Here are what the few months look like. Don’t worry, we’ll be with you for every step',
      image: 'image',
    },
  },
  {
    path: '/upload/left',
    overlay: {
      header: '',
      message: 'Say cheese!',
      image: 'image',
    },
  },
];

const initializeMock = (axios: AxiosInstance) => {
  let mock = new MockAdapter(axios);
  mock
    .onGet('/Master/Overlay')
    .reply(config => [200, createMockResponse(data), config.headers]);
};

export default initializeMock;
