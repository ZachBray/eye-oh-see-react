"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eye_oh_see_1 = require("eye-oh-see");
var React = require("react");
var ReactDOM = require("react-dom");
var ContainerProvider_1 = require("./ContainerProvider");
var NullReloadable_1 = require("./NullReloadable");
var Reloadable_1 = require("./Reloadable");
var context = window;
var reloadableState = context.__reloadableState || (context.__reloadableState = {});
var Application = (function () {
    function Application(iocModules) {
        this.iocModules = iocModules;
    }
    Application.prototype.start = function (rootElement, appModule) {
        var _this = this;
        this.rootElement = rootElement;
        this.container = new eye_oh_see_1.Container();
        this.bootstrapContainer();
        this.reloadState();
        this.renderRoot();
        if (appModule && appModule.hot) {
            appModule.hot.dispose(function () { return _this.stop(); });
            appModule.hot.accept();
        }
    };
    Application.prototype.stop = function () {
        ReactDOM.unmountComponentAtNode(this.rootHtmlElement);
        document.body.removeChild(this.rootHtmlElement);
        this.saveReloadableState();
        this.container.dispose();
    };
    Application.prototype.bootstrapContainer = function () {
        var _this = this;
        this.iocModules.forEach(function (mod) {
            mod.exports.forEach(function (exp) {
                _this.container.register(exp);
            });
        });
        // Necessary because resolveMany() will throw if nothing is registered
        this.container.register(NullReloadable_1.NullReloadable);
    };
    Application.prototype.saveReloadableState = function () {
        this.reloadables.forEach(function (reloadable) {
            reloadableState[reloadable.key] = reloadable.save();
        });
    };
    Application.prototype.reloadState = function () {
        this.reloadables = this.container.resolveManyAbstract(Reloadable_1.Reloadable);
        this.reloadables.forEach(function (reloadable) {
            var hotState = reloadableState[reloadable.key];
            if (hotState != null) {
                reloadable.load(hotState);
            }
        });
    };
    Application.prototype.renderRoot = function () {
        this.rootHtmlElement = document.createElement("div");
        document.body.appendChild(this.rootHtmlElement);
        var containerProps = { container: this.container };
        var containerRoot = React.createElement(ContainerProvider_1.ContainerProvider, containerProps, this.rootElement);
        ReactDOM.render(containerRoot, this.rootHtmlElement);
    };
    return Application;
}());
exports.Application = Application;
//# sourceMappingURL=Application.js.map