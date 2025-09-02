"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.starCanvasPickModule = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), constants_1 = require("../constants"), star_picker_1 = require("./star-picker");

let loadStarPick = !1;

exports.starCanvasPickModule = new vrender_core_1.ContainerModule(((bind, unbind, isBound, rebind) => {
    loadStarPick || (loadStarPick = !0, bind(constants_1.CanvasStarPicker).to(star_picker_1.DefaultCanvasStarPicker).inSingletonScope(), 
    bind(constants_1.CanvasPickerContribution).toService(constants_1.CanvasStarPicker));
}));
//# sourceMappingURL=star-module.js.map
