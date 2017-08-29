"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Module = (function () {
    function Module() {
    }
    Object.defineProperty(Module.prototype, "exports", {
        get: function () {
            var context = this.requireContext();
            var moduleObjects = context.keys().map(context);
            var serviceExports = [];
            moduleObjects.forEach(function (moduleObject) {
                Object.keys(moduleObject).forEach(function (k) {
                    var moduleExport = moduleObject[k];
                    if (typeof moduleExport === "function") {
                        serviceExports.push(moduleExport);
                    }
                });
            });
            return serviceExports;
        },
        enumerable: true,
        configurable: true
    });
    return Module;
}());
exports.Module = Module;
//# sourceMappingURL=Module.js.map