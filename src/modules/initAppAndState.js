import { history } from './history'

export const initializeAppAndState = async () => {
  history.push(`${window.location.pathname}${window.location.search}`);
  return ({ ready: true });
}