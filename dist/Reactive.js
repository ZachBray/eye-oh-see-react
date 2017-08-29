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
function toCallbacks(subjects) {
    var callbacks = {};
    for (var k in subjects) {
        if (subjects.hasOwnProperty(k)) {
            var subject = subjects[k];
            callbacks[k] = subject.onNext.bind(subject);
        }
    }
    return callbacks;
}
function toDumbState(observableState, onStateChanged) {
    var propValue$s = [];
    var _loop_1 = function (key) {
        if (observableState.hasOwnProperty(key)) {
            var value$ = observableState[key];
            if (value$.subscribe == null) {
                propValue$s.push(rx_1.Observable.just(value$));
            }
            else {
                propValue$s.push(value$.map(function (v) {
                    return (_a = {}, _a[key] = v, _a);
                    var _a;
                }));
            }
        }
    };
    for (var key in observableState) {
        _loop_1(key);
    }
    var props$ = rx_1.Observable.combineLatest(propValue$s)
        .map(function (propObjs) { return Object.assign.apply(Object, [{}].concat(propObjs)); });
    return props$.subscribe(onStateChanged); // todo - errors
}
function reactive(dumbComponent) {
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
            // todo - defer until props are ready?
            if (this.state.state == null) {
                return null;
            }
            return React.createElement(dumbComponent, this.state, this.props.children);
        };
        ReactiveComponentWrapper.prototype.subscribeToProps = function (props) {
            var _this = this;
            var intent = toCallbacks(props.intent);
            this.setState({ intent: intent, state: null });
            var subscription = toDumbState(props.state, function (state) { return _this.setState({ state: state }); });
            this.subscription.setDisposable(subscription);
        };
        return ReactiveComponentWrapper;
    }(React.Component));
    return ReactiveComponentWrapper;
}
exports.reactive = reactive;
//# sourceMappingURL=Reactive.js.map