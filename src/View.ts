import * as React from "react";
import { SerialDisposable } from "rx";
import { IModel, WriteIntent } from "./Model";

export type DumbProps<TIntent, TState, TUnresolved> = WriteIntent<TIntent> & TState & TUnresolved;
export type DumbComponent<TIntent, TState, TUnresolved> = React.ComponentType<DumbProps<TIntent, TState, TUnresolved>>;
export type SmartProps<TIntent, TState, TUnresolved> = IModel<TIntent, TState> & TUnresolved;

export function View<TIntent, TState, TUnresolved>(dumbComponent: DumbComponent<TIntent, TState, TUnresolved>)
                        : React.ComponentClass<SmartProps<TIntent, TState, TUnresolved>> {
  class ReactiveComponentWrapper extends React.Component<SmartProps<TIntent, TState, TUnresolved>, {}> {
    public state = {} as SmartProps<TIntent, TState, TUnresolved>;
    private readonly subscription = new SerialDisposable();

    public componentWillMount() {
      this.subscribeToProps(this.props);
    }

    public componentWillUnmount() {
      this.subscription.dispose();
    }

    public componentWillReceiveProps(newProps: Readonly<SmartProps<TIntent, TState, TUnresolved>>) {
      this.subscribeToProps(newProps);
    }

    public render() {
      // todo - defer until props are ready? warn?
      return React.createElement(dumbComponent as any, this.state, this.props.children);
    }

    private subscribeToProps(props: Readonly<SmartProps<TIntent, TState, TUnresolved>>) {
      const { intent , state$, ...rest } = props as any;
      this.setState(intent.write);
      this.setState(rest);
      const subscription = state$.subscribe((stateValue: TState) => this.setState(stateValue));
      this.subscription.setDisposable(subscription);
    }
  }
  return ReactiveComponentWrapper;
}
