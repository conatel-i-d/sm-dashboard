export const INIT = '@app/INIT';
export const APP_REFRESH = '@app/APP_REFRESH';
export const REFRESH_REQUEST = '@app/REFRESH_REQUEST';
export const LOGIN_ERROR = '@app/LOGIN_ERROR';
export const LOGIN_REQUEST = '@app/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@app/LOGIN_SUCCESS';
export const HISTORY_PUSH = '@history/PUSH';
export const NAV_TOGGLE = '@ui/NAV_TOGGLE';

export function navToggle() {
  return { type: NAV_TOGGLE };
}

export function loginSubmit(payload) {
  return { type: LOGIN_REQUEST, payload };
}
