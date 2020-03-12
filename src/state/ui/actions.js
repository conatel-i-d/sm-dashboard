export const INIT = '@app/INIT';
export const HISTORY_PUSH = '@history/PUSH';
export const NAV_TOGGLE = '@ui/NAV_TOGGLE';
export const LOGOUT_REQUEST = '@app/LOGOUT';

export function navToggle() {
  return { type: NAV_TOGGLE };
}

export function logout() {
  window.k.logout();
  return { type: LOGOUT_REQUEST };
}

export function historyPush(payload) {
  return {
    type: HISTORY_PUSH,
    payload
  }
}