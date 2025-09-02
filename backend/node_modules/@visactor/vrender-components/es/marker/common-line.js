import { mixin } from "@visactor/vutils";

import { limitShapeInBounds } from "../util/limit-shape";

import { Marker } from "./base";

import { DefaultExitMarkerAnimation, DefaultUpdateMarkLineAnimation } from "./animate/animate";

import { MarkLabelMixin } from "./mixin/label";

export class MarkCommonLine extends Marker {
    constructor() {
        super(...arguments), this.name = "markCommonLine", this.defaultUpdateAnimation = DefaultUpdateMarkLineAnimation, 
        this.defaultExitAnimation = DefaultExitMarkerAnimation;
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
            limitShapeInBounds(labelNode, {
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

mixin(MarkCommonLine, MarkLabelMixin);
//# sourceMappingURL=common-line.js.map
