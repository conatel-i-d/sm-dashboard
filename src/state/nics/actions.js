export function get(payload) {
  return {
    type: '@nics/GET_REQUEST',
    payload
  };
}