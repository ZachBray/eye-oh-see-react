export declare abstract class Reloadable {
    readonly abstract key: string;
    abstract save(): any;
    abstract load(state: any): void;
}
