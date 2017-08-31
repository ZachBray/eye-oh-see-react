/// <reference types="react" />
import * as React from "react";
import { IModel, WriteIntent } from "./Model";
export declare type DumbProps<TIntent, TState, TUnresolved> = WriteIntent<TIntent> & TState & TUnresolved;
export declare type DumbComponent<TIntent, TState, TUnresolved> = React.ComponentType<DumbProps<TIntent, TState, TUnresolved>>;
export declare type SmartProps<TIntent, TState, TUnresolved> = IModel<TIntent, TState> & TUnresolved;
export declare function View<TIntent, TState, TUnresolved>(dumbComponent: DumbComponent<TIntent, TState, TUnresolved>): React.ComponentClass<SmartProps<TIntent, TState, TUnresolved>>;
