/// <reference types="react" />
import { Container } from "eye-oh-see";
import * as React from "react";
export declare type Resolver<TResolved, TUnresolved> = (container: Container, unresolved: TUnresolved) => TResolved;
export declare function ResolveProps<TResolved, TUnresolved>(component: React.ComponentClass<TResolved>): (resolver: Resolver<TResolved, TUnresolved>) => React.ComponentClass<TUnresolved>;
