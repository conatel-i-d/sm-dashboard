import { of, merge, concat, race } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, debounceTime, map, switchMap, mapTo } from "rxjs/operators";
import { ofType } from 'redux-observable';
import { normalize } from 'normalizr'
import isFunction from 'lodash/isFunction';

export const defaultRestOptions = {
  create: true, 
  read: true, 
  update: true, 
  delete: true,
  parseResponse: (response) => Array.isArray(response) ? response : [response]
}
/**
 * Crea una lista de epicas para interactuar con un recurso de una API REST
 * @param {object} options Opciones de Configuración
 * @property {boolean} create Flag que indica la inclusión de un epic para crear recursos
 * @property {boolean} read Flag que inidca la inclusión de un epic para leer recursos
 * @property {boolean} update Flag que indica la inclusión de un epic para actualizar recursos
 * @property {boolean} delete Flag que indica la inclusión de un epic para eliminar recursos
 * @property {string} prefix Prefijo a utilizar para emitir las acciones
 * @property {normalizr.schema} schema Schema de Normalizr a utilizar
 */
export function rest$(options = {}) {
  options = Object.assign(defaultRestOptions, options);
  const epics = [];
  if (options.create) {
    epics.push(restEpicFactory({...options, ...{
      method: 'POST',
    }}));
  }
  if (options.read) {
    epics.push(restEpicFactory({...options, ...{
      method: 'GET',
    }}));
  }
  if (options.update) {
    epics.push(restEpicFactory({...options, ...{
      method: 'PUT',
    }}));
  }
  if (options.delete) {
    epics.push(restEpicFactory({...options, ...{
      method: 'DELETE',
    }}));
  }
  return epics;
}

export function restEpicFactory(options) {
  return function (action$, state$) {
    return action$.pipe(
      ofType(`@${options.prefix}/${options.method}_REQUEST`), 
      debounceTime(options.debounceTime || 0),
      switchMap(({ payload }) => {
        const ajax$ = ajax({
          url: `${resolveUrl(options.url, state$.value)}${payload && payload.id ? `/${payload.id}` : ''}`,
          method: options.method,
          headers: options.headers || {},
          body: options.method === 'POST' || options.method === 'PUT' ? payload : undefined
        }).pipe(
          map(({response}) => {
            if (options.method === 'GET') {
              response = options.parseResponse(response);
              response = normalize(response, [options.schema]);
            }

            return {
              type: `@${options.prefix}/${options.method}_SUCCESS`,
              payload: response
            }
          }),
          catchError(err => of({
            type: `@${options.prefix}/${options.method}_FAILURE`,
            payload: err.response.message
          }))
        );
        const blocker$ = merge(
          action$.pipe(
            ofType(`@${options.prefix}/${options.method}_CANCEL`)
          ),
        ).pipe(mapTo({type: `@${options.prefix}/${options.method}_CANCELED`}));
  
        return concat(
          of({ type: `@${options.prefix}/${options.method}_REQUEST_SENT` }),
          race(ajax$, blocker$)
        );
      })
    )
  }
}

function resolveUrl(url, state) {
  if (isFunction(url)) {
    return url(state);
  }
  return url;
}
