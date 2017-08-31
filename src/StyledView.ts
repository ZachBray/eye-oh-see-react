import { default as injectSheet , IStyle , StylingProps } from "react-jss";
import { IModel , WriteIntent } from "./Model";
import "./typings/react-jss";
import { View } from "./View";

export function StyledView<TIntent, TState, TStyle extends IStyle, TRest>(styleObj: TStyle) {
  return (component: React.ComponentType<StylingProps<TStyle, TState & WriteIntent<TIntent> & TRest>>)
         : React.ComponentType<IModel<TIntent, TState> & TRest> =>
    View<TIntent, TState, TRest>(injectSheet<TStyle, TState & WriteIntent<TIntent> & TRest>(styleObj)(component));
}
