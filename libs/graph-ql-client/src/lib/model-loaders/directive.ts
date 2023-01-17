import {TemplateRef} from "@angular/core";
import {ModelViewerComponent} from "./components";

export class ModelViewerDirective<T> {
  constructor(
    protected parent: ModelViewerComponent<T>,
    protected template: TemplateRef<{ $implicit: T }>
  ) {
    parent.setTemplate(template);
  }

  static ngTemplateContextGuard<T>(
    dir: ModelViewerDirective<T>,
    ctx: unknown
  ): ctx is null | { $implicit: T } {
    return true;
  }
}
