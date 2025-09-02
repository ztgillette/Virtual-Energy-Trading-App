import { ContainerModule } from "../../../common/inversify";

import { DefaultCanvasStarRender } from "./star-render";

import { GraphicRender, StarRender } from "./symbol";

let loadStarModule = !1;

export const starModule = new ContainerModule((bind => {
    loadStarModule || (loadStarModule = !0, bind(StarRender).to(DefaultCanvasStarRender).inSingletonScope(), 
    bind(GraphicRender).toService(StarRender));
}));
//# sourceMappingURL=star-module.js.map
