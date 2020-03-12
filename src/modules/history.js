import { createBrowserHistory } from 'history';
import { historyPush } from '../state/ui';
import { store } from '../' 
export const history = createBrowserHistory();

history.listen((location, action) => {
  store.dispatch(historyPush({ location, action }));
});