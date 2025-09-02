import { graphicCreator } from "@visactor/vrender-core";

import { isValidNumber, merge, mixin } from "@visactor/vutils";

import { Marker } from "./base";

import { DEFAULT_CARTESIAN_MARK_AREA_TEXT_STYLE_MAP, DEFAULT_MARK_AREA_THEME } from "./config";

import { limitShapeInBounds } from "../util/limit-shape";

import { loadMarkAreaComponent } from "./register";

import { DEFAULT_STATES } from "../constant";

import { DefaultExitMarkerAnimation, DefaultUpdateMarkAreaAnimation, markAreaAnimate } from "./animate/animate";

import { MarkLabelMixin } from "./mixin/label";

loadMarkAreaComponent();

export function registerMarkAreaAnimate() {
    MarkArea._animate = markAreaAnimate;
}

export class MarkArea extends Marker {
    markerAnimate(state) {
        MarkArea._animate && this._animationConfig && MarkArea._animate(this._area, this._label, this._animationConfig, state);
    }
    getArea() {
        return this._area;
    }
    constructor(attributes, options) {
        super((null == options ? void 0 : options.skipDefault) ? attributes : merge({}, MarkArea.defaultAttributes, attributes)), 
        this.name = "markArea", this.defaultUpdateAnimation = DefaultUpdateMarkAreaAnimation, 
        this.defaultExitAnimation = DefaultExitMarkerAnimation;
    }
    getPointAttrByPosition(position) {
        const {x1: x1, x2: x2, y1: y1, y2: y2} = this._area.AABBBounds, result = {
            x: (x1 + x2) / 2,
            y: (y1 + y2) / 2
        };
        return (position.includes("left") || position.includes("Left")) && (result.x = x1), 
        (position.includes("right") || position.includes("Right")) && (result.x = x2), (position.includes("top") || position.includes("Top")) && (result.y = y1), 
        (position.includes("bottom") || position.includes("Bottom")) && (result.y = y2), 
        result;
    }
    setLabelPos(labelNode, labelAttrs) {
        var _a;
        if (this._area) {
            const labelPosition = null !== (_a = labelAttrs.position) && void 0 !== _a ? _a : "middle", labelPoint = this.getPointAttrByPosition(labelPosition);
            if (labelNode.setAttributes(Object.assign(Object.assign({}, labelPoint), {
                textStyle: Object.assign(Object.assign({}, DEFAULT_CARTESIAN_MARK_AREA_TEXT_STYLE_MAP[labelPosition]), labelAttrs.textStyle)
            })), this.attribute.limitRect && labelAttrs.confine) {
                const {x: x, y: y, width: width, height: height} = this.attribute.limitRect;
                limitShapeInBounds(labelNode, {
                    x1: x,
                    y1: y,
                    x2: x + width,
                    y2: y + height
                });
            }
        }
    }
    initMarker(container) {
        const {points: points, areaStyle: areaStyle, state: state} = this.attribute, area = graphicCreator.polygon(Object.assign({
            points: points
        }, areaStyle));
        area.states = merge({}, DEFAULT_STATES, null == state ? void 0 : state.area), area.name = "mark-area-polygon", 
        this._area = area, container.add(area), this._addMarkLabels(container, "mark-area-label", MarkArea.defaultAttributes.label);
    }
    updateMarker() {
        const {points: points, areaStyle: areaStyle, state: state} = this.attribute;
        this._area && (this._area.setAttributes(Object.assign({
            points: points
        }, areaStyle)), this._area.states = merge({}, DEFAULT_STATES, null == state ? void 0 : state.area)), 
        this._updateMarkLabels(MarkArea.defaultAttributes.label);
    }
    isValidPoints() {
        const {points: points} = this.attribute;
        if (!points || points.length < 3) return !1;
        let validFlag = !0;
        return points.forEach((point => {
            isValidNumber(point.x) && isValidNumber(point.y) || (validFlag = !1);
        })), validFlag;
    }
}

MarkArea.defaultAttributes = DEFAULT_MARK_AREA_THEME, mixin(MarkArea, MarkLabelMixin);
//# sourceMappingURL=area.js.map
