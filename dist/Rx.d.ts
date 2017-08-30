declare module "rx" {
    type Disposer = () => void;
    interface Observable<T> {
        cache(callback: (disposer: Disposer) => void): Observable<T>;
    }
}
export {};
