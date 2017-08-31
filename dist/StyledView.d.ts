/// <reference types="react" />
import { IStyle, StylingProps } from "react-jss";
import { IModel, WriteIntent } from "./Model";
import "./typings/react-jss";
export declare function StyledView<TIntent, TState, TStyle extends IStyle, TRest>(styleObj: TStyle): (component: React.ComponentType<StylingProps<TStyle, TState & WriteIntent<TIntent> & TRest>>) => React.ComponentType<IModel<TIntent, TState> & TRest>;
