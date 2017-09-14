declare module "react-jss" {
  import * as React from "react";

  export interface IStyle {
    [key: string]: React.CSSProperties;
  }

  export type ClassNames<TStyle extends IStyle> = {
    [P in keyof TStyle]: P
  };

  export type StylingProps<TStyle extends IStyle, TProps> = TProps & { classes: ClassNames<TStyle> };

  export type ComponentNeedingStyling<TStyle extends IStyle, TProps> =
    React.ComponentType<StylingProps<TStyle, TProps>>;

  export default function injectSheet<TStyle extends IStyle, TProps>(style: TStyle)
                  : (component: ComponentNeedingStyling<TStyle, TProps>) => React.ComponentClass<TProps>;
}
