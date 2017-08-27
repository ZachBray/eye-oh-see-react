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
function resolveProps(propsToResolve, container) {
    var props = {};
    for (var k in propsToResolve) {
        if (propsToResolve.hasOwnProperty(k)) {
            props[k] = container.resolve(propsToResolve[k]);
        }
    }
    return props;
}
function Connect(config) {
    return function (childComponent) {
        var ContainerConsumer = (function (_super) {
            __extends(ContainerConsumer, _super);
            function ContainerConsumer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ContainerConsumer.prototype.componentWillMount = function () {
                this.container = this.context.container.createChild(config.scopeName);
                this.propsToResolve = resolveProps(config.propsToResolve, this.container);
            };
            ContainerConsumer.prototype.componentWillUnmount = function () {
                this.container.dispose();
            };
            ContainerConsumer.prototype.render = function () {
                return React.createElement(childComponent, __assign({}, this.propsToResolve, this.props), this.props.children);
            };
            ContainerConsumer.contextTypes = ContainerProvider_1.ContainerProvider.childContextTypes;
            return ContainerConsumer;
        }(React.Component));
        return ContainerConsumer;
    };
}
exports.Connect = Connect;
//# sourceMappingURL=Connect.js.map