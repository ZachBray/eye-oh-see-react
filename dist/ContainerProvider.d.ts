/// <reference types="react" />
import { Container } from "eye-oh-see";
import * as React from "react";
export interface IContainerProviderProps {
    container: Container;
}
export interface IContainerContext {
    container: Container;
}
export declare class ContainerProvider extends React.Component<IContainerProviderProps, void> {
    static childContextTypes: {
        container: any;
    };
    render(): React.ReactElement<any>;
    getChildContext(): IContainerContext;
}
