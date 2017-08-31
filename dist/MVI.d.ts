/// <reference types="react" />
import { Observable } from "rx";
import "./Rx";
export interface IModel<TIntent, TState> {
    intent: Intent<TIntent>;
    state$: Observable<TState>;
}
export interface IConstructor<T> {
    new (...args: any[]): T;
}
export declare function Model<T extends IModel<TIntent, TState>, TIntent, TState>(resolutionStrategy?: (target: any) => void): (target: IConstructor<T>) => IConstructor<T>;
export declare type View<TIntent, TState> = React.ComponentClass<IModel<TIntent, TState>>;
export declare type IntentKeys<TIntent> = {
    [P in keyof TIntent]: P;
};
export declare type WriteIntent<TIntent> = {
    [P in keyof TIntent]: (value: TIntent[P]) => void;
};
export declare type ReadIntent<TIntent> = {
    [P in keyof TIntent]: Observable<TIntent[P]>;
};
export interface Intent<TIntent> {
    read: ReadIntent<TIntent>;
    write: WriteIntent<TIntent>;
}
export declare function Intent<TIntent>(intentKeys: IntentKeys<TIntent>): Intent<TIntent>;
