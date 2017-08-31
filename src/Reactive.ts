import * as React from "react";
import { SerialDisposable } from "rx";
import { IModel, WriteIntent } from "./MVI";

export function Reactive<TIntent, TState>(dumbComponent: React.ComponentType<TState & WriteIntent<TIntent>>)
                                         : React.ComponentClass<IModel<TIntent, TState>> {
  class ReactiveComponentWrapper extends React.Component<IModel<TIntent, TState>, {}> {
    public state = {} as TState & WriteIntent<TIntent>;
    private readonly subscription = new SerialDisposable();

    public componentWillMount() {
      this.subscribeToProps(this.props);
    }

    public componentWillUnmount() {
      this.subscription.dispose();
    }

    public componentWillReceiveProps(newProps: IModel<TIntent, TState>) {
      this.subscribeToProps(newProps);
    }

    public render() {
      // todo - defer until props are ready? warn?
      return React.createElement(dumbComponent as any, this.state, this.props.children);
    }

    private subscribeToProps(props: Readonly<IModel<TIntent, TState>>) {
      const { intent , state$ } = props;
      this.setState(intent.write);
      const subscription = state$.subscribe(stateValue => this.setState(stateValue));
      this.subscription.setDisposable(subscription);
    }
  }
  return ReactiveComponentWrapper;
}