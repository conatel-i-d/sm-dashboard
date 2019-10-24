/**
 * Combina el resultado de multiples stateSelectors en un único objeto.
 * @param  {function[]} stateSelectors Lista de funciones que seleccionan información del state 
 */
export function combineStateSelectors(...stateSelectors) {
  return function(state, props) {
    const result = stateSelectors.reduce(function(accumulator, selector){
      return {...accumulator, ...selector(state, props)};
    }, {});
    return result;
  }
}