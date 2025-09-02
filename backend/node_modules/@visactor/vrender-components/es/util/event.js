import { vglobal } from "@visactor/vrender-core";

export function getEndTriggersOfDrag() {
    return "browser" === vglobal.env ? [ "pointerup", "pointerleave", "pointercancel" ] : [ "pointerup", "pointerleave", "pointerupoutside" ];
}
//# sourceMappingURL=event.js.map
