import { Container } from "eye-oh-see";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ContainerProvider } from "./ContainerProvider";
import { Module } from "./Module";
import { NullReloadable } from "./NullReloadable";
import { Reloadable } from "./Reloadable";

const context = window as any;
const reloadableState: { [key: string]: any } = context.__reloadableState || (context.__reloadableState = {});

export class Application {
  private rootHtmlElement: HTMLDivElement;
  private rootElement: JSX.Element;
  private container: Container;
  private reloadables: Reloadable[];

  constructor(private iocModules: Module[]) {}

  public start(rootElement: JSX.Element, appModule?: __WebpackModuleApi.Module) {
    this.rootElement = rootElement;
    this.container = new Container();
    this.bootstrapContainer();
    this.reloadState();
    this.renderRoot();
    if (appModule && appModule.hot) {
      appModule.hot.dispose(() => this.stop());
      appModule.hot.accept();
    }
  }

  public stop() {
    ReactDOM.unmountComponentAtNode(this.rootHtmlElement);
    document.body.removeChild(this.rootHtmlElement);
    this.saveReloadableState();
    this.container.dispose();
  }

  private bootstrapContainer() {
    this.iocModules.forEach((mod) => {
      mod.exports.forEach(exp => {
        this.container.register(exp);
      });
    });
    // Necessary because resolveMany() will throw if nothing is registered
    this.container.register(NullReloadable);
  }

  private saveReloadableState() {
    this.reloadables.forEach(reloadable => {
      reloadableState[reloadable.key] = reloadable.save();
    });
  }

  private reloadState() {
    this.reloadables = this.container.resolveManyAbstract<Reloadable>(Reloadable);
    this.reloadables.forEach(reloadable => {
      const hotState = reloadableState[reloadable.key];
      if (hotState != null) {
        reloadable.load(hotState);
      }
    });
  }

  private renderRoot() {
    this.rootHtmlElement = document.createElement("div");
    document.body.appendChild(this.rootHtmlElement);
    const containerProps = { container: this.container };
    const containerRoot = React.createElement(ContainerProvider, containerProps, this.rootElement);
    ReactDOM.render(containerRoot, this.rootHtmlElement);
  }
}
