import { Container } from "eye-oh-see";
import * as React from "react";
import { ContainerProvider , IContainerContext } from "./ContainerProvider";

export interface IContainerScopeProps {
  scopeName: string;
  children: JSX.Element;
}

export class ContainerScope extends React.Component<IContainerScopeProps, {}> {
  public static childContextTypes = ContainerProvider.childContextTypes;
  public static contextTypes = ContainerProvider.childContextTypes;
  public context: IContainerContext;
  private container: Container;

  public render() {
    return React.Children.only(this.props.children);
  }

  public getChildContext(): IContainerContext {
    return {
      container: this.container = (this.container || this.createContainer()),
    };
  }

  private createContainer() {
    return this.context.container.createChild(this.props.scopeName);
  }
}
