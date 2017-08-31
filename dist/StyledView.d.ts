/// <reference path="../src/typings/react-jss.d.ts" />
/// <reference types="react" />
import { IStyle, StylingProps } from "react-jss";
import { IModel, WriteIntent } from "./Model";
export declare function StyledView<TIntent, TState, TStyle extends IStyle, TRest>(styleObj: TStyle): (component: React.ComponentType<StylingProps<TStyle, TState & WriteIntent<TIntent> & TRest>>) => React.ComponentType<IModel<TIntent, TState> & TRest>;
