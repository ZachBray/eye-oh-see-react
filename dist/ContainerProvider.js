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
var ContainerProvider = (function (_super) {
    __extends(ContainerProvider, _super);
    function ContainerProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContainerProvider.prototype.render = function () {
        return React.Children.only(this.props.children);
    };
    ContainerProvider.prototype.getChildContext = function () {
        return {
            container: this.props.container,
        };
    };
    ContainerProvider.childContextTypes = {
        container: React.PropTypes.object,
    };
    return ContainerProvider;
}(React.Component));
exports.ContainerProvider = ContainerProvider;
//# sourceMappingURL=ContainerProvider.js.map