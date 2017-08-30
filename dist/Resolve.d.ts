/// <reference types="react" />
import { Container } from "eye-oh-see";
import * as React from "react";
export interface IContainerResolverProps<TResolvedProps> {
    scopeName: string;
    children: (props: TResolvedProps) => JSX.Element;
}
export declare type Resolver<TResolved, TUnresolved> = (container: Container, unresolved: TUnresolved) => TResolved;
export declare function Resolve<TResolved extends {}, TUnresolved>(component: React.ComponentClass<TResolved & TUnresolved>): (resolver: Resolver<TResolved, TUnresolved>) => React.ComponentClass<TUnresolved>;
