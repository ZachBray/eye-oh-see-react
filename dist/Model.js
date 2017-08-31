"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eye_oh_see_1 = require("eye-oh-see");
var RegistrationMetadata_1 = require("eye-oh-see/dist/src/attributes/RegistrationMetadata");
var rx_1 = require("rx");
require("./Rx");
function Model(resolutionStrategy) {
    if (resolutionStrategy === void 0) { resolutionStrategy = eye_oh_see_1.InstancePerDependency(); }
    return function (target) {
        var original = target;
        var originalMetadata = RegistrationMetadata_1.default.findOrCreate(original);
        function patched() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var instance = original.apply(this, args);
            var cachedState$ = this.state$.replay(undefined, 1);
            this.state$ = cachedState$;
            var subscription = cachedState$.connect();
            this.dispose = function () { return subscription.dispose(); };
            return instance;
        }
        patched.prototype = original.prototype;
        var patchedMetadata = RegistrationMetadata_1.default.findOrCreate(patched);
        // Copy parameter information to patched type for resolution through the container
        patchedMetadata.addInitialization(function (registration, container) {
            return originalMetadata.initializeRegistration(registration, container);
        });
        resolutionStrategy(patched);
        eye_oh_see_1.Disposable(patched); // TODO: add eye-oh-see test: disposable on abstract base class
        return patched;
    };
}
exports.Model = Model;
function Intent(intentKeys) {
    var read = {};
    var write = {};
    var _loop_1 = function (key) {
        if (intentKeys.hasOwnProperty(key)) {
            var subject_1 = new rx_1.Subject();
            read[key] = subject_1.asObservable();
            write[key] = function (x) { return subject_1.onNext(x); };
        }
    };
    for (var key in intentKeys) {
        _loop_1(key);
    }
    return { read: read, write: write };
}
exports.Intent = Intent;
//# sourceMappingURL=Model.js.map