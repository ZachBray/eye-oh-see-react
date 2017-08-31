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
function ResolveProps(component) {
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
                return React.createElement(component, this.resolved, this.props.children);
            };
            ComponentPropResolverWrapper.contextTypes = ContainerProvider_1.ContainerProvider.childContextTypes;
            return ComponentPropResolverWrapper;
        }(React.Component));
        return ComponentPropResolverWrapper;
    };
}
exports.ResolveProps = ResolveProps;
//# sourceMappingURL=ResolveProps.js.map