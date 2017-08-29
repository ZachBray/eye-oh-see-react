export abstract class Reloadable {
  public abstract get key(): string;
  public abstract save(): any;
  public abstract load(state: any): void;
}
