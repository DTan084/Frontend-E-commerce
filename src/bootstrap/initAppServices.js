import { appDataService } from '../services/data';

let initialized = false;

export const initAppServices = () => {
  if (initialized) return;
  appDataService.init();
  initialized = true;
};
