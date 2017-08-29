import { Container } from "eye-oh-see";
import * as React from "react";

export interface IContainerProviderProps {
  container: Container;
}

export interface IContainerContext {
  container: Container;
}

export class ContainerProvider extends React.Component<IContainerProviderProps, {}> {
  public static childContextTypes = {
    container: React.PropTypes.object as any,
  };

  public render() {
    return React.Children.only(this.props.children);
  }

  public getChildContext(): IContainerContext {
    return {
      container: this.props.container,
    };
  }
}
