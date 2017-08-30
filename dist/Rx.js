"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rx_1 = require("rx");
/* tslint:enable */
function cache(callback) {
    var cached$ = this.replay(undefined, 1);
    var subscription = cached$.connect();
    callback(function () { return subscription.dispose(); });
    return cached$;
}
rx_1.Observable.prototype.cache = cache;
//# sourceMappingURL=Rx.js.map