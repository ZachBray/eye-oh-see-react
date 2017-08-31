/// <reference types="react" />
import * as React from "react";
import { IModel, WriteIntent } from "./MVI";
export declare function Reactive<TIntent, TState>(dumbComponent: React.ComponentType<TState & WriteIntent<TIntent>>): React.ComponentClass<IModel<TIntent, TState>>;
