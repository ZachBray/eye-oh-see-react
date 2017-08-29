/// <reference types="rx-core-binding" />
/// <reference types="rx-core" />
/// <reference types="rx-lite" />
/// <reference types="rx-lite-aggregates" />
/// <reference types="rx-lite-backpressure" />
/// <reference types="rx-lite-coincidence" />
/// <reference types="rx-lite-experimental" />
/// <reference types="rx-lite-joinpatterns" />
/// <reference types="rx-lite-time" />
/// <reference types="react" />
import * as React from "react";
import { Observable, Subject } from "rx";
export declare type Subjects<T> = {
    [P in keyof T]: Subject<T[P]>;
};
export declare type Callbacks<T> = {
    [P in keyof T]: (value: T[P]) => void;
};
export declare type Model<TState> = {
    [P in keyof TState]: TState[P] | Observable<TState[P]>;
};
export interface IDumbProps<TState, TIntent> {
    state: TState;
    intent: Callbacks<TIntent>;
}
export interface IReactiveProps<TState, TIntent> {
    state: Model<TState>;
    intent: Subjects<TIntent>;
}
export declare function reactive<TState, TIntent>(dumbComponent: React.ComponentType<IDumbProps<TState, TIntent>>): React.ComponentClass<IReactiveProps<TState, TIntent>>;
