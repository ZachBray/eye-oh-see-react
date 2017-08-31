import { Container } from "eye-oh-see";
import * as React from "react";
import { ContainerProvider , IContainerContext } from "./ContainerProvider";

export type Resolver<TResolved, TUnresolved> = (container: Container, unresolved: TUnresolved) => TResolved;

export function ResolveProps<TResolved, TUnresolved>(component: React.ComponentClass<TResolved>) {
  return (resolver: Resolver<TResolved, TUnresolved>): React.ComponentClass<TUnresolved> => {
    class ComponentPropResolverWrapper extends React.Component<TUnresolved, {}> {
      public static contextTypes = ContainerProvider.childContextTypes;
      public context: IContainerContext;
      private resolved: TResolved;

      public componentWillMount() {
        this.resolved = resolver(this.context.container, this.props);
      }

      public render() {
        return React.createElement(component, this.resolved, this.props.children);
      }
    }
    return ComponentPropResolverWrapper;
  };
}
