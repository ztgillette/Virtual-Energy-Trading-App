"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerStarGraphic = void 0;

const star_1 = require("../graphic/star"), graphic_creator_1 = require("../graphic/graphic-creator");

function registerStarGraphic() {
    graphic_creator_1.graphicCreator.RegisterGraphicCreator("star", star_1.createStar);
}

exports.registerStarGraphic = registerStarGraphic;
//# sourceMappingURL=register-star.js.map
