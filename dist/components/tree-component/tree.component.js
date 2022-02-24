"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
var React = require("react");
require("./tree.styles.css");
var pathShapes_1 = require("./pathShapes");
var treeBuildFunctions_1 = require("./treeBuildFunctions");
var Tree = /** @class */ (function (_super) {
    __extends(Tree, _super);
    function Tree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tree.prototype.render = function () {
        var _a = this.props, nodeWidth = _a.nodeWidth, nodeHeight = _a.nodeHeight, data = _a.data, yOffset = _a.yOffset, xOffset = _a.xOffset, lineClassName = _a.lineClassName, content = _a.nodeContent;
        var pathStyle = typeof this.props.pathShape == "function" ? this.props.pathShape : pathShapes_1.default[this.props.pathShape];
        var dataTree = (0, treeBuildFunctions_1.processTree)(data, yOffset, xOffset, nodeWidth, nodeHeight);
        var dataList = (0, treeBuildFunctions_1.createNodesArray)(dataTree);
        var connectingLines = (0, treeBuildFunctions_1.createConnectingLinesArray)(dataTree, nodeWidth, nodeHeight, pathStyle);
        var _b = dataList.reduce(function (limits, node) { return ({
            width: Math.max(limits.width, node.x + node.width),
            height: Math.max(limits.height, node.y + node.height)
        }); }, { width: 0, height: 0 }), width = _b.width, height = _b.height;
        return (React.createElement("div", null,
            React.createElement("div", { className: "root", style: { width: width, height: height } },
                React.createElement("div", null, dataList.map(function (node) { return (React.createElement("div", { style: { height: nodeHeight, width: nodeWidth, top: node.y, left: node.x }, className: "nodeBox", key: node.id }, content(node))); })),
                React.createElement("svg", { width: width, height: height }, connectingLines.map(function (path) { return (React.createElement("path", { d: path.path, className: lineClassName, key: path.id })); })))));
    };
    ;
    Tree.defaultProps = {
        pathShape: pathShapes_1.default.bezier,
        nodeWidth: 100,
        nodeHeight: 50,
        lineClassName: "connectingLine",
        xOffset: 50,
        yOffset: 50,
    };
    return Tree;
}(React.Component));
exports.Tree = Tree;
;
