/// <reference types="react" />
declare module "react-jss" {
    interface IStyle {
        [key: string]: React.CSSProperties;
    }
    type ClassNames<TStyle extends IStyle> = {
        [P in keyof TStyle]: P;
    };
    type StylingProps<TStyle extends IStyle, TProps> = TProps & {
        classes: ClassNames<TStyle>;
    };
    type ComponentNeedingStyling<TStyle extends IStyle, TProps> = React.ComponentType<StylingProps<TStyle, TProps>>;
    function injectSheet<TStyle extends IStyle, TProps>(style: TStyle): (component: ComponentNeedingStyling<TStyle, TProps>) => React.ComponentClass<TProps>;
}
