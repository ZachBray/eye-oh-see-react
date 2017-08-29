/// <reference types="react" />
import * as React from "react";
import { IContainerContext } from "./ContainerProvider";
export interface IContainerScopeProps {
    scopeName: string;
    children: JSX.Element;
}
export declare class ContainerScope extends React.Component<IContainerScopeProps, {}> {
    static childContextTypes: {
        container: any;
    };
    static contextTypes: {
        container: any;
    };
    context: IContainerContext;
    private container;
    render(): React.ReactElement<any>;
    getChildContext(): IContainerContext;
    private createContainer();
}
