import { actionCreator } from '../utils';

const ENTITY = 'alerts';

/**
 * 
 * @param { Object } alert
 * @param { String } alert.type Tipo de alerta, valores posibles: 
 * "default", "info", "success", "warning", "danger"
 * @param { String } alert.title titulo unico para esta alerta, 
 * al ocultar una alerta se ocultar todas las del mismo titulo  
 * @param { String } alert.description descripcion que aparece bajo el titulo de la alerta  
 */
export const addAlert = (alert) => ({type: `@${ENTITY}/ADD`, payload: alert });
/**
 * @param { String } title Titulo unico para esta alerta, 
 * al ocultar alerta para este titulo, se ocultar todas las del mismo titulo  
 */
export const hide = (title) => ({type: `@${ENTITY}/HIDE`, payload: title });
