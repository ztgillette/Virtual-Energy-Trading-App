"use strict";

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

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DefaultCanvasStarRender = void 0;

const inversify_lite_1 = require("../../../common/inversify-lite"), theme_1 = require("../../../graphic/theme"), constants_1 = require("../../../graphic/constants"), constants_2 = require("./contributions/constants"), contribution_provider_1 = require("../../../common/contribution-provider"), base_render_1 = require("./base-render"), contributions_1 = require("./contributions");

let DefaultCanvasStarRender = class extends base_render_1.BaseRender {
    constructor(starRenderContribitions) {
        super(), this.starRenderContribitions = starRenderContribitions, this.numberType = constants_1.STAR_NUMBER_TYPE, 
        this.builtinContributions = [ contributions_1.defaultStarBackgroundRenderContribution, contributions_1.defaultStarTextureRenderContribution ], 
        this.init(starRenderContribitions);
    }
    drawShape(star, context, x, y, drawContext, params, fillCb, strokeCb) {
        const starAttribute = (0, theme_1.getTheme)(star, null == params ? void 0 : params.theme).star, {x: originX = starAttribute.x, y: originY = starAttribute.y, fillStrokeOrder: fillStrokeOrder = starAttribute.fillStrokeOrder} = star.attribute, data = this.valid(star, starAttribute, fillCb, strokeCb);
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
        const starAttribute = (0, theme_1.getTheme)(star, null == params ? void 0 : params.theme).star;
        this._draw(star, starAttribute, !1, drawContext, params);
    }
};

DefaultCanvasStarRender = __decorate([ (0, inversify_lite_1.injectable)(), __param(0, (0, 
inversify_lite_1.inject)(contribution_provider_1.ContributionProvider)), __param(0, (0, 
inversify_lite_1.named)(constants_2.StarRenderContribution)), __metadata("design:paramtypes", [ Object ]) ], DefaultCanvasStarRender), 
exports.DefaultCanvasStarRender = DefaultCanvasStarRender;
//# sourceMappingURL=star-render.js.map
