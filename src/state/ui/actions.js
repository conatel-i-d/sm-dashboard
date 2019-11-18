export const INIT = '@app/INIT';
export const LOGIN_REFRESH = '@app/LOGIN_REFRESH';
export const LOGIN_ERROR = '@app/LOGIN_ERROR';
export const LOGIN_REQUEST = '@app/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@app/LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = '@app/LOGOUT_SUCCESS';
export const LOGOUT_REQUEST = '@app/LOGOUT_REQUEST';
export const HISTORY_PUSH = '@history/PUSH';
export const NAV_TOGGLE = '@ui/NAV_TOGGLE';

export function navToggle() {
  return { type: NAV_TOGGLE };
}

export function loginSubmit(payload) {
  return { type: LOGIN_REQUEST, payload };
}

export function logout() {
  return { type: LOGOUT_REQUEST }
}