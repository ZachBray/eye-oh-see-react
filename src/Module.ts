export abstract class Module {

  public get exports(): any[] {
    const context = this.requireContext();
    const moduleObjects = context.keys().map(context);
    const serviceExports: any[] = [];
    moduleObjects.forEach((moduleObject: any) => {
      Object.keys(moduleObject).forEach(k => {
        const moduleExport = moduleObject[k];
        if (typeof moduleExport === "function") {
          serviceExports.push(moduleExport);
        }
      });
    });
    return serviceExports;
  }

  protected abstract requireContext(): __WebpackModuleApi.RequireContext;

}
