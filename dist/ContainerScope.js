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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ContainerProvider_1 = require("./ContainerProvider");
var ContainerScope = (function (_super) {
    __extends(ContainerScope, _super);
    function ContainerScope() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContainerScope.prototype.render = function () {
        return React.Children.only(this.props.children);
    };
    ContainerScope.prototype.getChildContext = function () {
        return {
            container: this.container = (this.container || this.createContainer()),
        };
    };
    ContainerScope.prototype.createContainer = function () {
        return this.context.container.createChild(this.props.scopeName);
    };
    ContainerScope.childContextTypes = ContainerProvider_1.ContainerProvider.childContextTypes;
    ContainerScope.contextTypes = ContainerProvider_1.ContainerProvider.childContextTypes;
    return ContainerScope;
}(React.Component));
exports.ContainerScope = ContainerScope;
//# sourceMappingURL=ContainerScope.js.map