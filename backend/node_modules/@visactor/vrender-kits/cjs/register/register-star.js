"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerStar = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), env_1 = require("./env"), star_module_1 = require("../picker/contributions/canvas-picker/star-module");

function _registerStar() {
    _registerStar.__loaded || (_registerStar.__loaded = !0, (0, vrender_core_1.registerStarGraphic)(), 
    vrender_core_1.container.load(vrender_core_1.starModule), vrender_core_1.container.load((env_1.browser, 
    star_module_1.starCanvasPickModule)));
}

_registerStar.__loaded = !1, exports.registerStar = _registerStar;
//# sourceMappingURL=register-star.js.map