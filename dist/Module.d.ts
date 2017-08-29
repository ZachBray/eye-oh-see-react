/// <reference types="webpack-env" />
export declare abstract class Module {
    readonly exports: any[];
    protected abstract requireContext(): __WebpackModuleApi.RequireContext;
}
