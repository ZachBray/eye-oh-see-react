import { SingleInstance } from "eye-oh-see";
import { Reloadable } from "./Reloadable";

@SingleInstance(Reloadable)
export class NullReloadable {
  public get key() {
    return "null";
  }

  public save() {
    return undefined;
  }

  public load() {
    // No-op
  }
}
