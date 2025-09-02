"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.starModule = void 0;

const inversify_1 = require("../../../common/inversify"), star_render_1 = require("./star-render"), symbol_1 = require("./symbol");

let loadStarModule = !1;

exports.starModule = new inversify_1.ContainerModule((bind => {
    loadStarModule || (loadStarModule = !0, bind(symbol_1.StarRender).to(star_render_1.DefaultCanvasStarRender).inSingletonScope(), 
    bind(symbol_1.GraphicRender).toService(symbol_1.StarRender));
}));
//# sourceMappingURL=star-module.js.map
