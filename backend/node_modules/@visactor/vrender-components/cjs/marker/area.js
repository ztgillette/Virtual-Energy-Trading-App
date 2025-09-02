"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.MarkArea = exports.registerMarkAreaAnimate = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), vutils_1 = require("@visactor/vutils"), base_1 = require("./base"), config_1 = require("./config"), limit_shape_1 = require("../util/limit-shape"), register_1 = require("./register"), constant_1 = require("../constant"), animate_1 = require("./animate/animate"), label_1 = require("./mixin/label");

function registerMarkAreaAnimate() {
    MarkArea._animate = animate_1.markAreaAnimate;
}

(0, register_1.loadMarkAreaComponent)(), exports.registerMarkAreaAnimate = registerMarkAreaAnimate;

class MarkArea extends base_1.Marker {
    markerAnimate(state) {
        MarkArea._animate && this._animationConfig && MarkArea._animate(this._area, this._label, this._animationConfig, state);
    }
    getArea() {
        return this._area;
    }
    constructor(attributes, options) {
        super((null == options ? void 0 : options.skipDefault) ? attributes : (0, vutils_1.merge)({}, MarkArea.defaultAttributes, attributes)), 
        this.name = "markArea", this.defaultUpdateAnimation = animate_1.DefaultUpdateMarkAreaAnimation, 
        this.defaultExitAnimation = animate_1.DefaultExitMarkerAnimation;
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
                textStyle: Object.assign(Object.assign({}, config_1.DEFAULT_CARTESIAN_MARK_AREA_TEXT_STYLE_MAP[labelPosition]), labelAttrs.textStyle)
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
        const {points: points, areaStyle: areaStyle, state: state} = this.attribute, area = vrender_core_1.graphicCreator.polygon(Object.assign({
            points: points
        }, areaStyle));
        area.states = (0, vutils_1.merge)({}, constant_1.DEFAULT_STATES, null == state ? void 0 : state.area), 
        area.name = "mark-area-polygon", this._area = area, container.add(area), this._addMarkLabels(container, "mark-area-label", MarkArea.defaultAttributes.label);
    }
    updateMarker() {
        const {points: points, areaStyle: areaStyle, state: state} = this.attribute;
        this._area && (this._area.setAttributes(Object.assign({
            points: points
        }, areaStyle)), this._area.states = (0, vutils_1.merge)({}, constant_1.DEFAULT_STATES, null == state ? void 0 : state.area)), 
        this._updateMarkLabels(MarkArea.defaultAttributes.label);
    }
    isValidPoints() {
        const {points: points} = this.attribute;
        if (!points || points.length < 3) return !1;
        let validFlag = !0;
        return points.forEach((point => {
            (0, vutils_1.isValidNumber)(point.x) && (0, vutils_1.isValidNumber)(point.y) || (validFlag = !1);
        })), validFlag;
    }
}

exports.MarkArea = MarkArea, MarkArea.defaultAttributes = config_1.DEFAULT_MARK_AREA_THEME, 
(0, vutils_1.mixin)(MarkArea, label_1.MarkLabelMixin);
//# sourceMappingURL=area.js.map
