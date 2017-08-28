/// <reference types="rx-core" />
/// <reference types="rx-core-binding" />
/// <reference types="rx-lite" />
/// <reference types="rx-lite-aggregates" />
/// <reference types="rx-lite-backpressure" />
/// <reference types="rx-lite-coincidence" />
/// <reference types="rx-lite-experimental" />
/// <reference types="rx-lite-joinpatterns" />
/// <reference types="rx-lite-time" />
/// <reference types="react" />
import * as React from "react";
import { Observable } from "rx";
import { PropResolver } from "./Connect";
export interface IConstructor<T> {
    new (...args: any[]): T;
}
export declare type Model<TModelProps> = {
    [P in keyof TModelProps]: Observable<TModelProps[P]>;
};
export declare type View<TModelProps, TIntentProps> = React.ComponentType<TModelProps & TIntentProps>;
export interface IMVIConfig<TModelProps, TIntentProps> {
    scope: string;
    modelClass: IConstructor<Model<TModelProps>>;
    intentClass: IConstructor<TIntentProps>;
}
export declare function mvi<TM, TI>(config: IMVIConfig<TM, TI>): PropResolver<TM & TI>;
