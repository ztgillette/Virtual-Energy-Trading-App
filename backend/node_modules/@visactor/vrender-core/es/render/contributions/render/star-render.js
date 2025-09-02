var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}, __metadata = this && this.__metadata || function(k, v) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(k, v);
}, __param = this && this.__param || function(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
};

import { inject, injectable, named } from "../../../common/inversify-lite";

import { getTheme } from "../../../graphic/theme";

import { STAR_NUMBER_TYPE } from "../../../graphic/constants";

import { StarRenderContribution } from "./contributions/constants";

import { ContributionProvider } from "../../../common/contribution-provider";

import { BaseRender } from "./base-render";

import { defaultStarBackgroundRenderContribution, defaultStarTextureRenderContribution } from "./contributions";

let DefaultCanvasStarRender = class extends BaseRender {
    constructor(starRenderContribitions) {
        super(), this.starRenderContribitions = starRenderContribitions, this.numberType = STAR_NUMBER_TYPE, 
        this.builtinContributions = [ defaultStarBackgroundRenderContribution, defaultStarTextureRenderContribution ], 
        this.init(starRenderContribitions);
    }
    drawShape(star, context, x, y, drawContext, params, fillCb, strokeCb) {
        const starAttribute = getTheme(star, null == params ? void 0 : params.theme).star, {x: originX = starAttribute.x, y: originY = starAttribute.y, fillStrokeOrder: fillStrokeOrder = starAttribute.fillStrokeOrder} = star.attribute, data = this.valid(star, starAttribute, fillCb, strokeCb);
        if (!data) return;
        const {fVisible: fVisible, sVisible: sVisible, doFill: doFill, doStroke: doStroke} = data, points = star.getCachedPoints();
        context.beginPath(), points && points.length && points.forEach(((point, index) => {
            0 === index ? context.moveTo(x + point.x, y + point.y) : context.lineTo(x + point.x, y + point.y);
        })), context.closePath(), context.setShadowBlendStyle && context.setShadowBlendStyle(star, star.attribute, starAttribute), 
        this.beforeRenderStep(star, context, x, y, doFill, doStroke, fVisible, sVisible, starAttribute, drawContext, fillCb, strokeCb);
        const _runFill = () => {
            doFill && (fillCb ? fillCb(context, star.attribute, starAttribute) : fVisible && (context.setCommonStyle(star, star.attribute, originX - x, originY - y, starAttribute), 
            context.fill()));
        }, _runStroke = () => {
            doStroke && (strokeCb ? strokeCb(context, star.attribute, starAttribute) : sVisible && (context.setStrokeStyle(star, star.attribute, originX - x, originY - y, starAttribute), 
            context.stroke()));
        };
        fillStrokeOrder ? (_runStroke(), _runFill()) : (_runFill(), _runStroke()), this.afterRenderStep(star, context, x, y, doFill, doStroke, fVisible, sVisible, starAttribute, drawContext, fillCb, strokeCb);
    }
    draw(star, renderService, drawContext, params) {
        const starAttribute = getTheme(star, null == params ? void 0 : params.theme).star;
        this._draw(star, starAttribute, !1, drawContext, params);
    }
};

DefaultCanvasStarRender = __decorate([ injectable(), __param(0, inject(ContributionProvider)), __param(0, named(StarRenderContribution)), __metadata("design:paramtypes", [ Object ]) ], DefaultCanvasStarRender);

export { DefaultCanvasStarRender };
//# sourceMappingURL=star-render.js.map
