/// <reference types="react" />
import * as React from "react";
import { IModel } from "./IModel";
export declare function Reactive<TState, TIntent>(dumbComponent: React.ComponentType<TState & TIntent>): React.ComponentClass<IModel<TIntent, TState>>;
