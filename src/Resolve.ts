import { Container } from "eye-oh-see";
import * as React from "react";
import { ContainerProvider , IContainerContext } from "./ContainerProvider";

export interface IContainerResolverProps<TResolvedProps> {
  scopeName: string;
  children: (props: TResolvedProps) => JSX.Element;
}

export type Resolver<TResolved, TUnresolved> = (container: Container, unresolved: TUnresolved) => TResolved;

export function Resolve<TResolved extends {}, TUnresolved>(component: React.ComponentClass<TResolved & TUnresolved>) {
  return (resolver: Resolver<TResolved, TUnresolved>): React.ComponentClass<TUnresolved> => {
    class ComponentPropResolverWrapper extends React.Component<TUnresolved, {}> {
      public static contextTypes = ContainerProvider.childContextTypes;
      public context: IContainerContext;
      private resolved: TResolved;

      public componentWillMount() {
        this.resolved = resolver(this.context.container, this.props);
      }

      public render() {
        return React.createElement(component, {
          // need casts until: https://github.com/Microsoft/TypeScript/issues/13557
          ...(this.props as any),
          ...(this.resolved as any),
        }, this.props.children);
      }
    }
    return ComponentPropResolverWrapper;
  };
}

export interface IConstructor<T> {
  new(...args: any[]): T;
}

export type ResolvableProps<T> = {
  [P in keyof T]: IConstructor<T[P]>
};

export function ByType<TResolved>(resolvable: ResolvableProps<TResolved>) {
  return (container: Container) => {
    const resolved = {} as TResolved;
    for (const key in resolvable) {
      if (resolvable.hasOwnProperty(key)) {
        resolved[key] = container.resolve(resolvable[key]);
      }
    }
    return resolved;
  };
}
