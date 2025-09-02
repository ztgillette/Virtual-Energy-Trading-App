"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.MarkCommonLine = void 0;

const vutils_1 = require("@visactor/vutils"), limit_shape_1 = require("../util/limit-shape"), base_1 = require("./base"), animate_1 = require("./animate/animate"), label_1 = require("./mixin/label");

class MarkCommonLine extends base_1.Marker {
    constructor() {
        super(...arguments), this.name = "markCommonLine", this.defaultUpdateAnimation = animate_1.DefaultUpdateMarkLineAnimation, 
        this.defaultExitAnimation = animate_1.DefaultExitMarkerAnimation;
    }
    getLine() {
        return this._line;
    }
    setLabelPos(labelNode, labelAttrs) {
        const {limitRect: limitRect} = this.attribute, {position: position, confine: confine, autoRotate: autoRotate} = labelAttrs, labelPoint = this.getPointAttrByPosition(position, labelAttrs), labelAngle = position.toString().toLocaleLowerCase().includes("start") ? this._line.getStartAngle() || 0 : this._line.getEndAngle() || 0;
        if (labelNode.setAttributes(Object.assign(Object.assign({}, labelPoint.position), {
            angle: autoRotate ? this.getRotateByAngle(labelPoint.angle, labelAttrs) : 0,
            textStyle: Object.assign(Object.assign({}, this.getTextStyle(position, labelAngle, autoRotate)), labelAttrs.textStyle)
        })), limitRect && confine) {
            const {x: x, y: y, width: width, height: height} = limitRect;
            (0, limit_shape_1.limitShapeInBounds)(labelNode, {
                x1: x,
                y1: y,
                x2: x + width,
                y2: y + height
            });
        }
    }
    initMarker(container) {
        const line = this.createSegment();
        line.name = "mark-common-line-line", this._line = line, container.add(line), this.addMarkLineLabels(container);
    }
    updateMarker() {
        this.setLineAttributes(), this.updateMarkLineLabels();
    }
}

exports.MarkCommonLine = MarkCommonLine, (0, vutils_1.mixin)(MarkCommonLine, label_1.MarkLabelMixin);
//# sourceMappingURL=common-line.js.map
