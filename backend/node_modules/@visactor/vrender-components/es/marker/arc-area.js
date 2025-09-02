import { graphicCreator } from "@visactor/vrender-core";

import { merge, mixin } from "@visactor/vutils";

import { Marker } from "./base";

import { DEFAULT_MARK_ARC_AREA_THEME, DEFAULT_POLAR_MARKER_TEXT_STYLE_MAP } from "./config";

import { IMarkCommonArcLabelPosition } from "./type";

import { limitShapeInBounds } from "../util/limit-shape";

import { loadMarkArcAreaComponent } from "./register";

import { DEFAULT_STATES } from "../constant";

import { DefaultExitMarkerAnimation, DefaultUpdateMarkAreaAnimation, markArcAreaAnimate } from "./animate/animate";

import { MarkLabelMixin } from "./mixin/label";

loadMarkArcAreaComponent();

export function registerMarkArcAreaAnimate() {
    MarkArcArea._animate = markArcAreaAnimate;
}

export class MarkArcArea extends Marker {
    markerAnimate(state) {
        MarkArcArea._animate && this._animationConfig && MarkArcArea._animate(this._area, this._label, this._animationConfig, state);
    }
    getArea() {
        return this._area;
    }
    constructor(attributes, options) {
        super((null == options ? void 0 : options.skipDefault) ? attributes : merge({}, MarkArcArea.defaultAttributes, attributes)), 
        this.name = "markArcArea", this.defaultUpdateAnimation = DefaultUpdateMarkAreaAnimation, 
        this.defaultExitAnimation = DefaultExitMarkerAnimation;
    }
    getPointAttrByPosition(position, labelAttrs) {
        const {center: center, innerRadius: innerRadius, outerRadius: outerRadius, startAngle: startAngle, endAngle: endAngle} = this.attribute, {refX: refX = 0, refY: refY = 0} = labelAttrs;
        let radius, angle;
        switch (position) {
          case IMarkCommonArcLabelPosition.center:
            radius = (innerRadius + outerRadius) / 2, angle = (startAngle + endAngle) / 2;
            break;

          case IMarkCommonArcLabelPosition.arcInnerStart:
            radius = innerRadius, angle = startAngle;
            break;

          case IMarkCommonArcLabelPosition.arcOuterStart:
            radius = outerRadius, angle = startAngle;
            break;

          case IMarkCommonArcLabelPosition.arcInnerEnd:
            radius = innerRadius, angle = endAngle;
            break;

          case IMarkCommonArcLabelPosition.arcOuterEnd:
            radius = outerRadius, angle = endAngle;
            break;

          case IMarkCommonArcLabelPosition.arcInnerMiddle:
            radius = innerRadius, angle = (startAngle + endAngle) / 2;
            break;

          case IMarkCommonArcLabelPosition.arcOuterMiddle:
            radius = outerRadius, angle = (startAngle + endAngle) / 2;
            break;

          default:
            radius = innerRadius, angle = (startAngle + endAngle) / 2;
        }
        return {
            position: {
                x: center.x + (radius + refY) * Math.cos(angle) + refX * Math.cos(angle - Math.PI / 2),
                y: center.y + (radius + refY) * Math.sin(angle) + refX * Math.sin(angle - Math.PI / 2)
            },
            angle: angle
        };
    }
    setLabelPos(labelNode, labelAttrs) {
        var _a;
        if (this._area) {
            const {position: labelPosition = "arcInnerMiddle", autoRotate: autoRotate} = labelAttrs, labelAttr = this.getPointAttrByPosition(labelPosition, labelAttrs);
            if (labelNode.setAttributes(Object.assign(Object.assign({}, labelAttr.position), {
                angle: autoRotate ? labelAttr.angle - Math.PI / 2 + (null !== (_a = labelAttrs.refAngle) && void 0 !== _a ? _a : 0) : 0,
                textStyle: Object.assign(Object.assign({}, DEFAULT_POLAR_MARKER_TEXT_STYLE_MAP[labelPosition]), labelAttrs.textStyle)
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
        const {center: center, innerRadius: innerRadius, outerRadius: outerRadius, startAngle: startAngle, endAngle: endAngle, areaStyle: areaStyle, state: state} = this.attribute, area = graphicCreator.arc(Object.assign({
            x: center.x,
            y: center.y,
            innerRadius: innerRadius,
            outerRadius: outerRadius,
            startAngle: startAngle,
            endAngle: endAngle
        }, areaStyle));
        area.states = merge({}, DEFAULT_STATES, null == state ? void 0 : state.area), area.name = "polar-mark-area-area", 
        this._area = area, container.add(area), this._addMarkLabels(container, "mark-area-label", MarkArcArea.defaultAttributes.label);
    }
    updateMarker() {
        const {center: center, innerRadius: innerRadius, outerRadius: outerRadius, startAngle: startAngle, endAngle: endAngle, areaStyle: areaStyle, label: label, state: state} = this.attribute;
        this._area && (this._area.setAttributes(Object.assign({
            x: center.x,
            y: center.y,
            innerRadius: innerRadius,
            outerRadius: outerRadius,
            startAngle: startAngle,
            endAngle: endAngle
        }, areaStyle)), this._area.states = merge({}, DEFAULT_STATES, null == state ? void 0 : state.area)), 
        this._updateMarkLabels(MarkArcArea.defaultAttributes.label);
    }
    isValidPoints() {
        return !0;
    }
}

MarkArcArea.defaultAttributes = DEFAULT_MARK_ARC_AREA_THEME, mixin(MarkArcArea, MarkLabelMixin);
//# sourceMappingURL=arc-area.js.map
