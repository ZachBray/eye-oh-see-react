/// <reference types="react" />
import * as React from "react";
export interface IConstructor<T> {
    new (...args: any[]): T;
}
export declare type ResolvableProps<T> = {
    [P in keyof T]: IConstructor<T[P]>;
};
export interface IConnnectConfig<TProps, TResolvableProps> {
    scopeName: string;
    propsToResolve: ResolvableProps<TResolvableProps>;
    childComponent: React.ComponentType<TProps & TResolvableProps>;
}
export declare function Connect<TProps, TResolvableProps>(config: IConnnectConfig<TProps, TResolvableProps>): (childComponent: React.ComponentType<TProps & TResolvableProps>) => React.ComponentClass<TProps>;
