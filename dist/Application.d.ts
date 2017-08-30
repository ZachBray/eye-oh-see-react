/// <reference types="react" />
/// <reference types="webpack-env" />
import { Module } from "./Module";
export declare class Application {
    private iocModules;
    private rootHtmlElement;
    private rootElement;
    private container;
    private reloadables;
    constructor(iocModules: Module[]);
    start(rootElement: JSX.Element, appModule?: __WebpackModuleApi.Module): void;
    stop(): void;
    private bootstrapContainer();
    private saveReloadableState();
    private reloadState();
    private renderRoot();
}
