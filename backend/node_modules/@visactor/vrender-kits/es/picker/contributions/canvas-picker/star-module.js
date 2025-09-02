import { ContainerModule } from "@visactor/vrender-core";

import { CanvasPickerContribution, CanvasStarPicker } from "../constants";

import { DefaultCanvasStarPicker } from "./star-picker";

let loadStarPick = !1;

export const starCanvasPickModule = new ContainerModule(((bind, unbind, isBound, rebind) => {
    loadStarPick || (loadStarPick = !0, bind(CanvasStarPicker).to(DefaultCanvasStarPicker).inSingletonScope(), 
    bind(CanvasPickerContribution).toService(CanvasStarPicker));
}));
//# sourceMappingURL=star-module.js.map
