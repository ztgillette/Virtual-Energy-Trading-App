"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerGifImage = exports.registerGifGraphic = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), gif_image_1 = require("../graphic/gif-image"), gif_image_module_1 = require("../render/contributions/canvas/gif-image-module"), gif_image_module_2 = require("../picker/contributions/canvas-picker/gif-image-module");

function registerGifGraphic() {
    vrender_core_1.graphicCreator.RegisterGraphicCreator("gif", gif_image_1.createGifImage);
}

function _registerGifImage() {
    _registerGifImage.__loaded || (_registerGifImage.__loaded = !0, registerGifGraphic(), 
    vrender_core_1.container.load(gif_image_module_1.gifImageModule), vrender_core_1.container.load(gif_image_module_2.gifImageCanvasPickModule));
}

exports.registerGifGraphic = registerGifGraphic, _registerGifImage.__loaded = !1, 
exports.registerGifImage = _registerGifImage;