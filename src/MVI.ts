import { Container } from "eye-oh-see";
import * as React from "react";
import { Disposable , Observable } from "rx";
import { PropResolver } from "./Connect";

export interface IConstructor<T> {
  new(...args: any[]): T;
}

export type Model<TModelProps> = {
  [P in keyof TModelProps]: Observable<TModelProps[P]>
};

export type View<TModelProps, TIntentProps> = React.ComponentType<TModelProps & TIntentProps>;

export interface IMVIConfig<TModelProps, TIntentProps> {
  scope: string;
  modelClass: IConstructor<Model<TModelProps>>;
  intentClass: IConstructor<TIntentProps>;
}

export function mvi<TM, TI>(config: IMVIConfig<TM, TI>): PropResolver<TM & TI> {
  return (container: Container) => Observable.createWithDisposable((propObserver) => {
    const childContainer = container.createChild(config.scope);
    const model = childContainer.resolve(config.modelClass);
    const intent = childContainer.resolve(config.intentClass);
    const parts: Array<Observable<any>> = [];
    parts.push(Observable.just(intent));
    for (const k in model) {
      if (model.hasOwnProperty(k)) {
        const value$ = model[k];
        parts.push(value$.map((v) => ({ [k]: v })));
      }
    }
    const props$ = Observable.combineLatest(parts, (_, propObjs) => Object.assign({}, ...propObjs));
    const subscription = props$.subscribe(propObserver);
    return Disposable.create(() => {
      subscription.dispose();
      childContainer.dispose();
    });
  });
}
