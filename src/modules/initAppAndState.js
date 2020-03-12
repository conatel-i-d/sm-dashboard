import { history } from './history'

export const initializeAppAndState = async () => {
  history.push(window.location.pathname);
  return ({ ready: true });
}