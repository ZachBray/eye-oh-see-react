import * as React from "react";
import { Disposable , Observable , SerialDisposable , Subject } from "rx";

export type Subjects<T> = {
  [P in keyof T]: Subject<T[P]>
};

export type Callbacks<T> = {
  [P in keyof T]: (value: T[P]) => void
};

export type Model<TState> = {
  [P in keyof TState]: TState[P] | Observable<TState[P]>
};

export interface IDumbProps<TState, TIntent> {
  state: TState;
  intent: Callbacks<TIntent>;
}

export interface IReactiveProps<TState, TIntent> {
  state: Model<TState>;
  intent: Subjects<TIntent>;
}

function toCallbacks<T>(subjects: Subjects<T>): Callbacks<T> {
  const callbacks = {} as Callbacks<T>;
  for (const k in subjects) {
    if (subjects.hasOwnProperty(k)) {
      const subject = subjects[k];
      callbacks[k] = subject.onNext.bind(subject);
    }
  }
  return callbacks;
}

function toDumbState<T>(observableState: Model<T>, onStateChanged: (state: T) => void): Disposable {
  const propValue$s: Array<Observable<any>> = [];
  for (const key in observableState) {
    if (observableState.hasOwnProperty(key)) {
      const value$: any = observableState[key];
      if (value$.subscribe == null) {
        propValue$s.push(Observable.just(value$));
      } else {
        propValue$s.push(value$.map((v: any) => ({ [key]: v })));
      }
    }
  }
  const props$ = Observable.combineLatest(propValue$s)
                           .map(propObjs => Object.assign({}, ...propObjs));
  return props$.subscribe(onStateChanged); // todo - errors
}

export function reactive<TState, TIntent>(dumbComponent: React.ComponentType<IDumbProps<TState, TIntent>>)
                                         : React.ComponentClass<IReactiveProps<TState, TIntent>> {
  class ReactiveComponentWrapper extends React.Component<IReactiveProps<TState, TIntent>, {}> {
    public state = {} as IReactiveProps<TState, TIntent>;
    private readonly subscription = new SerialDisposable();

    public componentWillMount() {
      this.subscribeToProps(this.props);
    }

    public componentWillUnmount() {
      this.subscription.dispose();
    }

    public componentWillReceiveProps(newProps: IReactiveProps<TState, TIntent>) {
      this.subscribeToProps(newProps);
    }

    public render() {
      // todo - defer until props are ready?
      if (this.state.state == null) {
        return null;
      }
      return React.createElement(dumbComponent as any, this.state, this.props.children);
    }

    private subscribeToProps(props: IReactiveProps<TState, TIntent>) {
      const intent = toCallbacks(props.intent);
      this.setState({ intent, state: null });
      const subscription = toDumbState(props.state, (state) => this.setState({ state }));
      this.subscription.setDisposable(subscription);
    }
  }
  return ReactiveComponentWrapper;
}
