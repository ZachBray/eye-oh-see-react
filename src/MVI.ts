import { Disposable , InstancePerDependency } from "eye-oh-see";
import RegistrationMetadata from "eye-oh-see/dist/src/attributes/RegistrationMetadata";
import { Observable , Subject } from "rx";
import "./Rx";

export interface IModel<TIntent, TState> {
  intent: Intent<TIntent>;
  state$: Observable<TState>;
}

export interface IConstructor<T> {
  new(...args: any[]): T;
}

export function Model<T extends IModel<TIntent, TState>,
                      TIntent,
                      TState
                     >(resolutionStrategy: (target: any) => void = InstancePerDependency()) {
  return (target: IConstructor<T>): IConstructor<T> => {
    const original = target;
    const originalMetadata = RegistrationMetadata.findOrCreate(original);
    function patched(this: T, ...args: any[]) {
      const instance = original.apply(this, args);
      const cachedState$ = this.state$.replay(undefined, 1);
      this.state$ = cachedState$;
      const subscription = cachedState$.connect();
      (this as any).dispose = () => subscription.dispose();
      return instance;
    }
    patched.prototype = original.prototype;
    const patchedMetadata = RegistrationMetadata.findOrCreate(patched);
    // Copy parameter information to patched type for resolution through the container
    patchedMetadata.addInitialization((registration, container) =>
      originalMetadata.initializeRegistration(registration, container as any));
    resolutionStrategy(patched);
    Disposable(patched); // TODO: add eye-oh-see test: disposable on abstract base class
    return patched as any;
  };
}

export type View<TIntent, TState> = React.ComponentClass<IModel<TIntent, TState>>;

export type IntentKeys<TIntent> = {
  [P in keyof TIntent]: P
};

export type WriteIntent<TIntent> = {
  [P in keyof TIntent]: (value: TIntent[P]) => void;
};

export type ReadIntent<TIntent> = {
  [P in keyof TIntent]: Observable<TIntent[P]>;
};

export interface Intent<TIntent> {
  read: ReadIntent<TIntent>;
  write: WriteIntent<TIntent>;
}

export function Intent<TIntent>(intentKeys: IntentKeys<TIntent>): Intent<TIntent> {
  const read = {} as ReadIntent<TIntent>;
  const write = {} as WriteIntent<TIntent>;
  for (const key in intentKeys) {
    if (intentKeys.hasOwnProperty(key)) {
      const subject = new Subject<any>();
      read[key] = subject.asObservable();
      write[key] = x => subject.onNext(x);
    }
  }
  return { read, write };
}
