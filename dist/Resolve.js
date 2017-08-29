"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ContainerProvider_1 = require("./ContainerProvider");
function Resolve(component) {
    return function (resolver) {
        var ComponentPropResolverWrapper = (function (_super) {
            __extends(ComponentPropResolverWrapper, _super);
            function ComponentPropResolverWrapper() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ComponentPropResolverWrapper.prototype.componentWillMount = function () {
                this.resolved = resolver(this.context.container, this.props);
            };
            ComponentPropResolverWrapper.prototype.render = function () {
                return React.createElement(component, __assign({}, this.props, this.resolved), this.props.children);
            };
            ComponentPropResolverWrapper.contextTypes = ContainerProvider_1.ContainerProvider.childContextTypes;
            return ComponentPropResolverWrapper;
        }(React.Component));
        return ComponentPropResolverWrapper;
    };
}
exports.Resolve = Resolve;
function ByType(resolvable) {
    return function (container) {
        var resolved = {};
        for (var key in resolvable) {
            if (resolvable.hasOwnProperty(key)) {
                resolved[key] = container.resolve(resolvable[key]);
            }
        }
        return resolved;
    };
}
exports.ByType = ByType;
//# sourceMappingURL=Resolve.js.map