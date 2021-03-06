"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_jss_1 = require("react-jss");
require("./typings/react-jss");
var View_1 = require("./View");
function StyledView(styleObj) {
    return function (component) {
        return View_1.View(react_jss_1.default(styleObj)(component));
    };
}
exports.StyledView = StyledView;
function StyledDumbView(styleObj) {
    return function (component) {
        return react_jss_1.default(styleObj)(component);
    };
}
exports.StyledDumbView = StyledDumbView;
//# sourceMappingURL=StyledView.js.map