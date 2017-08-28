"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rx_1 = require("rx");
function mvi(config) {
    return function (container) { return rx_1.Observable.createWithDisposable(function (propObserver) {
        var childContainer = container.createChild(config.scope);
        var model = childContainer.resolve(config.modelClass);
        var intent = childContainer.resolve(config.intentClass);
        var parts = [];
        parts.push(rx_1.Observable.just(intent));
        var _loop_1 = function (k) {
            if (model.hasOwnProperty(k)) {
                var value$ = model[k];
                parts.push(value$.map(function (v) {
                    return (_a = {}, _a[k] = v, _a);
                    var _a;
                }));
            }
        };
        for (var k in model) {
            _loop_1(k);
        }
        var props$ = rx_1.Observable.combineLatest(parts, function (_, propObjs) { return Object.assign.apply(Object, [{}].concat(propObjs)); });
        var subscription = props$.subscribe(propObserver);
        return rx_1.Disposable.create(function () {
            subscription.dispose();
            childContainer.dispose();
        });
    }); };
}
exports.mvi = mvi;
//# sourceMappingURL=MVI.js.map