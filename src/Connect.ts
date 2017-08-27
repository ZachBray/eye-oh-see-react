import { Container } from "eye-oh-see";
import * as React from "react";
import { ContainerProvider, IContainerContext } from "./ContainerProvider";

export interface IConstructor<T> {
  new(...args: any[]): T;
}

export type ResolvableProps<T> = {
  [P in keyof T]: IConstructor<T[P]>
};

export interface IConnnectConfig<TProps, TResolvableProps> {
  scopeName: string;
  propsToResolve: ResolvableProps<TResolvableProps>;
  childComponent: React.ComponentType<TProps & TResolvableProps>;
}

function resolveProps<TProps>(propsToResolve: ResolvableProps<TProps>, container: Container): TProps {
  const props: any = {};
  for (const k in propsToResolve) {
    if (propsToResolve.hasOwnProperty(k)) {
      props[k] = container.resolve(propsToResolve[k]);
    }
  }
  return props as TProps;
}

export function Connect<TProps, TResolvableProps>(config: IConnnectConfig<TProps, TResolvableProps>) {
  return (childComponent: React.ComponentType<TProps & TResolvableProps>): React.ComponentClass<TProps> => {
    class ContainerConsumer extends React.Component<TProps, {}> {
      public static contextTypes = ContainerProvider.childContextTypes;
      public context: IContainerContext;
      public container: Container;
      private propsToResolve: TResolvableProps;

      public componentWillMount() {
        this.container = this.context.container.createChild(config.scopeName);
        this.propsToResolve = resolveProps(config.propsToResolve, this.container);
      }

      public componentWillUnmount() {
        this.container.dispose();
      }

      public render() {
        return React.createElement(childComponent as any, {
          ...(this.propsToResolve as any),
          ...(this.props as any),
        }, this.props.children);
      }
    }
    return ContainerConsumer;
  };
}
