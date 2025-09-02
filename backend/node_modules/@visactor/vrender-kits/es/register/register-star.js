import { container, starModule, registerStarGraphic } from "@visactor/vrender-core";

import { browser } from "./env";

import { starCanvasPickModule } from "../picker/contributions/canvas-picker/star-module";

function _registerStar() {
    _registerStar.__loaded || (_registerStar.__loaded = !0, registerStarGraphic(), container.load(starModule), 
    container.load(starCanvasPickModule));
}

_registerStar.__loaded = !1;

export const registerStar = _registerStar;
//# sourceMappingURL=register-star.js.map