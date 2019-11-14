import { useReducer } from 'react';

export function useCustomState(initialState) {
  const reducer = (prevState, updatedProperty) => ({
    ...prevState,
    ...updatedProperty
  });

  const [state, setState] = useReducer(reducer, initialState);

  return [state, setState];
}
