export * from './reducers.js';
/**
 * Simplifica la actualización de un objeto de forma inmutable.
 * @param {object} oldObject Objeto actual
 * @param {object} newValues Lista de nuevos valores a modificar en el objeto
 */
export function updateObject(oldObject, newValues) {
  return {
    ...oldObject,
    ...newValues
  };
}
/**
 * Opciones por defecto de la función updateItemInArray.
 */
export const updateItemInArrayDefaultOptions = {
  objectIdentifier: 'id'
};
/**
 *
 * @param {any[]} array Lista donde se encuentra el item a modificar.
 * @param {any} itemIdentifier Valor del identificador del item en el array de
 * @param {function} updateItemCallback Función que modifica el item.
 * @param {object} [options] Opciones que modifican el comportamiento de la función
 * @property {string} [objectIdentifier] Nombre del identificador del item.
 */
export function updateItemInArray(
  array,
  itemIdentifier,
  updateItemCallback,
  options
) {
  options = updateObject(updateItemInArrayDefaultOptions, options);
  return array.map(item => {
    if (item[options.objectIdentifier] !== itemIdentifier) {
      return item;
    }
    return updateItemCallback(item);
  });
}
/**
 * Agrega un elemento a una lista de forma inmutable
 * @param {any[]} array Lista donde se agregara el item
 * @param {any} newItem Nuevo item a agregar
 */
export function appendItemInArray(array, newItem) {
  return [...array, newItem];
}
/**
 * Utilidad que permite la creación de `reducers` a partir de un mapa entre `action types`
 * y funciones que modifiquen el estado.
 * @param {any} initialState Estado por defecto del nuevo reducer
 * @param {function[]} handlers Mapa entre `action types` y funciones que cambien el estado
 */
export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, { type, payload }) {
    if (handlers.hasOwnProperty(type)) {
      return handlers[type](state, payload);
    } else {
      return state;
    }
  };
}

export function getToken() {
  if (window.k !== undefined) return window.k.idToken;
  return '';
}

export async function updateToken() {
  try {
    if (window.k !== undefined) {
        await window.k.updateToken(70)
      }
  }
  catch {
    alert('Failed to refresh token');
  }
}

export const getUserRoles = () => {
  const base64Payload = window.k.token.split('.')[1];
  const payload = JSON.parse(atob(base64Payload))
  return payload.realm_access 
  ? payload.realm_access.roles !== undefined
      ? payload.realm_access.roles
      : []
  : []
}