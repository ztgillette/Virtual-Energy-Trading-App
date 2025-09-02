import { container, graphicCreator } from "@visactor/vrender-core";

import { createGifImage } from "../graphic/gif-image";

import { gifImageModule } from "../render/contributions/canvas/gif-image-module";

import { gifImageCanvasPickModule } from "../picker/contributions/canvas-picker/gif-image-module";

export function registerGifGraphic() {
    graphicCreator.RegisterGraphicCreator("gif", createGifImage);
}

function _registerGifImage() {
    _registerGifImage.__loaded || (_registerGifImage.__loaded = !0, registerGifGraphic(), 
    container.load(gifImageModule), container.load(gifImageCanvasPickModule));
}

_registerGifImage.__loaded = !1;

export const registerGifImage = _registerGifImage;