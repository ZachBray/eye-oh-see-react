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
import { Container } from "eye-oh-see";
import * as React from "react";
import { Observable } from "rx";
export declare type PropResolver<TResolvedProps> = (container: Container) => Observable<TResolvedProps>;
export declare function connect<TProps, TResolvedProps>(resolveProps: PropResolver<TResolvedProps>): (childComponent: React.ComponentType<TProps & TResolvedProps>) => React.ComponentClass<TProps>;
