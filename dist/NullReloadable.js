"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var eye_oh_see_1 = require("eye-oh-see");
var Reloadable_1 = require("./Reloadable");
var NullReloadable = (function () {
    function NullReloadable() {
    }
    Object.defineProperty(NullReloadable.prototype, "key", {
        get: function () {
            return "null";
        },
        enumerable: true,
        configurable: true
    });
    NullReloadable.prototype.save = function () {
        return undefined;
    };
    NullReloadable.prototype.load = function () {
        // No-op
    };
    NullReloadable = __decorate([
        eye_oh_see_1.SingleInstance(Reloadable_1.Reloadable)
    ], NullReloadable);
    return NullReloadable;
}());
exports.NullReloadable = NullReloadable;
//# sourceMappingURL=NullReloadable.js.map