"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.MarkArcArea = exports.registerMarkArcAreaAnimate = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), vutils_1 = require("@visactor/vutils"), base_1 = require("./base"), config_1 = require("./config"), type_1 = require("./type"), limit_shape_1 = require("../util/limit-shape"), register_1 = require("./register"), constant_1 = require("../constant"), animate_1 = require("./animate/animate"), label_1 = require("./mixin/label");

function registerMarkArcAreaAnimate() {
    MarkArcArea._animate = animate_1.markArcAreaAnimate;
}

(0, register_1.loadMarkArcAreaComponent)(), exports.registerMarkArcAreaAnimate = registerMarkArcAreaAnimate;

class MarkArcArea extends base_1.Marker {
    markerAnimate(state) {
        MarkArcArea._animate && this._animationConfig && MarkArcArea._animate(this._area, this._label, this._animationConfig, state);
    }
    getArea() {
        return this._area;
    }
    constructor(attributes, options) {
        super((null == options ? void 0 : options.skipDefault) ? attributes : (0, vutils_1.merge)({}, MarkArcArea.defaultAttributes, attributes)), 
        this.name = "markArcArea", this.defaultUpdateAnimation = animate_1.DefaultUpdateMarkAreaAnimation, 
        this.defaultExitAnimation = animate_1.DefaultExitMarkerAnimation;
    }
    getPointAttrByPosition(position, labelAttrs) {
        const {center: center, innerRadius: innerRadius, outerRadius: outerRadius, startAngle: startAngle, endAngle: endAngle} = this.attribute, {refX: refX = 0, refY: refY = 0} = labelAttrs;
        let radius, angle;
        switch (position) {
          case type_1.IMarkCommonArcLabelPosition.center:
            radius = (innerRadius + outerRadius) / 2, angle = (startAngle + endAngle) / 2;
            break;

          case type_1.IMarkCommonArcLabelPosition.arcInnerStart:
            radius = innerRadius, angle = startAngle;
            break;

          case type_1.IMarkCommonArcLabelPosition.arcOuterStart:
            radius = outerRadius, angle = startAngle;
            break;

          case type_1.IMarkCommonArcLabelPosition.arcInnerEnd:
            radius = innerRadius, angle = endAngle;
            break;

          case type_1.IMarkCommonArcLabelPosition.arcOuterEnd:
            radius = outerRadius, angle = endAngle;
            break;

          case type_1.IMarkCommonArcLabelPosition.arcInnerMiddle:
            radius = innerRadius, angle = (startAngle + endAngle) / 2;
            break;

          case type_1.IMarkCommonArcLabelPosition.arcOuterMiddle:
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
                textStyle: Object.assign(Object.assign({}, config_1.DEFAULT_POLAR_MARKER_TEXT_STYLE_MAP[labelPosition]), labelAttrs.textStyle)
            })), this.attribute.limitRect && labelAttrs.confine) {
                const {x: x, y: y, width: width, height: height} = this.attribute.limitRect;
                (0, limit_shape_1.limitShapeInBounds)(labelNode, {
                    x1: x,
                    y1: y,
                    x2: x + width,
                    y2: y + height
                });
            }
        }
    }
    initMarker(container) {
        const {center: center, innerRadius: innerRadius, outerRadius: outerRadius, startAngle: startAngle, endAngle: endAngle, areaStyle: areaStyle, state: state} = this.attribute, area = vrender_core_1.graphicCreator.arc(Object.assign({
            x: center.x,
            y: center.y,
            innerRadius: innerRadius,
            outerRadius: outerRadius,
            startAngle: startAngle,
            endAngle: endAngle
        }, areaStyle));
        area.states = (0, vutils_1.merge)({}, constant_1.DEFAULT_STATES, null == state ? void 0 : state.area), 
        area.name = "polar-mark-area-area", this._area = area, container.add(area), this._addMarkLabels(container, "mark-area-label", MarkArcArea.defaultAttributes.label);
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
        }, areaStyle)), this._area.states = (0, vutils_1.merge)({}, constant_1.DEFAULT_STATES, null == state ? void 0 : state.area)), 
        this._updateMarkLabels(MarkArcArea.defaultAttributes.label);
    }
    isValidPoints() {
        return !0;
    }
}

exports.MarkArcArea = MarkArcArea, MarkArcArea.defaultAttributes = config_1.DEFAULT_MARK_ARC_AREA_THEME, 
(0, vutils_1.mixin)(MarkArcArea, label_1.MarkLabelMixin);
//# sourceMappingURL=arc-area.js.map
