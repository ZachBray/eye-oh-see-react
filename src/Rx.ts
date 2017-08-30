import { Observable } from "rx";

/* tslint:disable */
declare module "rx" {
  type Disposer = () => void;
  interface Observable<T> {
    cache(callback: (disposer: Disposer) => void): Observable<T>;
  }
}
/* tslint:enable */

function cache<T>(this: Observable<T>, callback: (disposer: Rx.Disposer) => void): Observable<T> {
  const cached$ = this.replay(undefined, 1);
  const subscription = cached$.connect();
  callback(() => subscription.dispose());
  return cached$;
}

Observable.prototype.cache = cache;
