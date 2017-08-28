import { Container } from "eye-oh-see";
import * as React from "react";
import { Disposable , Observable } from "rx";
import { ContainerProvider, IContainerContext } from "./ContainerProvider";

export type PropResolver<TResolvedProps> = (container: Container) => Observable<TResolvedProps>;

export function connect<TProps, TResolvedProps>(resolveProps: PropResolver<TResolvedProps>) {
  return (childComponent: React.ComponentType<TProps & TResolvedProps>): React.ComponentClass<TProps> => {
    class ContainerConsumer extends React.Component<TProps, {}> {
      public static contextTypes = ContainerProvider.childContextTypes;
      public context: IContainerContext;
      public container: Container;
      public state = {
        resolvedProps: null as null | TResolvedProps,
      };
      private subscription: Disposable;

      public componentWillMount() {
        const resolvedProps$ = resolveProps(this.context.container);
        this.subscription = resolvedProps$.subscribe((resolvedProps) => this.setState({ resolvedProps }));
      }

      public componentWillUnmount() {
        this.subscription.dispose();
      }

      public render() {
        // todo - defer until props are ready?
        return React.createElement(childComponent as any, {
          ...(this.state.resolvedProps as any),
          ...(this.props as any),
        }, this.props.children);
      }
    }
    return ContainerConsumer;
  };
}
