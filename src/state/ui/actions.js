export const INIT = '@app/INIT';
export const HISTORY_PUSH = '@history/PUSH';
export const NAV_TOGGLE = '@ui/NAV_TOGGLE';

export function navToggle() {
  return { type: NAV_TOGGLE };
}