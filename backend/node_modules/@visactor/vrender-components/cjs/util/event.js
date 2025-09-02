"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getEndTriggersOfDrag = void 0;

const vrender_core_1 = require("@visactor/vrender-core");

function getEndTriggersOfDrag() {
    return "browser" === vrender_core_1.vglobal.env ? [ "pointerup", "pointerleave", "pointercancel" ] : [ "pointerup", "pointerleave", "pointerupoutside" ];
}

exports.getEndTriggersOfDrag = getEndTriggersOfDrag;
//# sourceMappingURL=event.js.map
