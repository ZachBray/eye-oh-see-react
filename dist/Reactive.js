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
var rx_1 = require("rx");
function Reactive(dumbComponent) {
    var ReactiveComponentWrapper = (function (_super) {
        __extends(ReactiveComponentWrapper, _super);
        function ReactiveComponentWrapper() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {};
            _this.subscription = new rx_1.SerialDisposable();
            return _this;
        }
        ReactiveComponentWrapper.prototype.componentWillMount = function () {
            this.subscribeToProps(this.props);
        };
        ReactiveComponentWrapper.prototype.componentWillUnmount = function () {
            this.subscription.dispose();
        };
        ReactiveComponentWrapper.prototype.componentWillReceiveProps = function (newProps) {
            this.subscribeToProps(newProps);
        };
        ReactiveComponentWrapper.prototype.render = function () {
            // todo - defer until props are ready? warn?
            return React.createElement(dumbComponent, this.state, this.props.children);
        };
        ReactiveComponentWrapper.prototype.subscribeToProps = function (props) {
            var _this = this;
            var intent = props.intent, state$ = props.state$;
            this.setState(intent.write);
            var subscription = state$.subscribe(function (stateValue) { return _this.setState(stateValue); });
            this.subscription.setDisposable(subscription);
        };
        return ReactiveComponentWrapper;
    }(React.Component));
    return ReactiveComponentWrapper;
}
exports.Reactive = Reactive;
//# sourceMappingURL=Reactive.js.map