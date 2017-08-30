import { Observable } from "rx";
export interface IModel<TIntent, TState> {
    intent: TIntent;
    state: Observable<TState>;
}
