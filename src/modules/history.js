import { Observable } from 'rxjs';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
export const history$ = Observable.create(function(observer) {
  return history.listen((location, action) => observer.next({location, action}));
});