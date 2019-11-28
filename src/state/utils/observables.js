import { of, merge, concat, race } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  catchError,
  debounceTime,
  map,
  switchMap,
  mapTo
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import isFunction from 'lodash/isFunction';

export const defaultRestOptions = {
  create: true,
  read: true,
  update: true,
  delete: true,
  parseResponse: response => (Array.isArray(response) ? response : [response]),
  headers: {
    'Content-Type': 'application/json'
  }
};
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
    epics.push(
      restEpicFactory({
        ...options,
        ...{
          method: 'POST'
        }
      })
    );
  }
  if (options.read) {
    epics.push(
      restEpicFactory({
        ...options,
        ...{
          method: 'GET'
        }
      })
    );
  }
  if (options.update) {
    epics.push(
      restEpicFactory({
        ...options,
        ...{
          method: 'PUT'
        }
      })
    );
  }
  if (options.delete) {
    epics.push(
      restEpicFactory({
        ...options,
        ...{
          method: 'DELETE'
        }
      })
    );
  }
  return epics;
}

export function restEpicFactory(options) {
  return function(action$, state$) {
    return action$.pipe(
      ofType(`@${options.prefix}/${options.method}_REQUEST`),
      debounceTime(options.debounceTime || 0),
      switchMap(({ payload }) => {
        const ajax$ = ajax({
          url: `${resolveUrl(options.url, state$.value, payload)}${
            payload && payload.id ? `/${payload.id}` : ''
          }`,
          method: options.method,
          headers: options.headers.call() || {},
          body:
            options.method === 'POST' || options.method === 'PUT'
              ? payload
              : undefined
        }).pipe(
          map(({ response }) => {
            return {
              type: `@${options.prefix}/${options.method}_SUCCESS`,
              payload: options.parseResponse(
                response,
                options,
                payload,
                state$.value
              )
            };
          }),
          catchError(err =>
            of({
              type: `@${options.prefix}/${options.method}_FAILURE`,
              payload:
                err.response && err.response.message
                  ? err.response.message
                  : err
            })
          )
        );
        const blocker$ = merge(
          action$.pipe(ofType(`@${options.prefix}/${options.method}_CANCEL`))
        ).pipe(
          mapTo({ type: `@${options.prefix}/${options.method}_CANCELED` })
        );

        return concat(
          of({ type: `@${options.prefix}/${options.method}_REQUEST_SENT` }),
          race(ajax$, blocker$)
        );
      })
    );
  };
}

export function rebootEpic(action$) {
  return action$.pipe(
    ofType('@nics/REBOOT_REQUEST'),
    switchMap(({ payload: { name, switchId } }) => {
      const ajax$ = ajax({
        url: `/api/switch/${switchId}/nics/reset?nic_name=${name}`,
        method: 'POST'
      }).pipe(
        map(() => {
          return {
            type: `@nics/REBOOT_SUCCESS`
          };
        }),
        catchError(err =>
          of({
            type: `@nics/REBOOT_FAILURE`,
            payload:
              err.response && err.response.message ? err.response.message : err
          })
        )
      );
      return ajax$;
    })
  );
}

function resolveUrl(url, state, payload) {
  if (isFunction(url)) {
    return url(state, payload);
  }
  return url;
}
