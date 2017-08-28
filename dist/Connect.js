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
function connect(resolveProps) {
    return function (childComponent) {
        var ContainerConsumer = (function (_super) {
            __extends(ContainerConsumer, _super);
            function ContainerConsumer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.state = {
                    resolvedProps: null,
                };
                return _this;
            }
            ContainerConsumer.prototype.componentWillMount = function () {
                var _this = this;
                var resolvedProps$ = resolveProps(this.context.container);
                this.subscription = resolvedProps$.subscribe(function (resolvedProps) { return _this.setState({ resolvedProps: resolvedProps }); });
            };
            ContainerConsumer.prototype.componentWillUnmount = function () {
                this.subscription.dispose();
            };
            ContainerConsumer.prototype.render = function () {
                // todo - defer until props are ready?
                return React.createElement(childComponent, __assign({}, this.state.resolvedProps, this.props), this.props.children);
            };
            ContainerConsumer.contextTypes = ContainerProvider_1.ContainerProvider.childContextTypes;
            return ContainerConsumer;
        }(React.Component));
        return ContainerConsumer;
    };
}
exports.connect = connect;
//# sourceMappingURL=Connect.js.map