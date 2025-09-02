"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.obbSeparation = exports.aabbSeparation = exports.calculateAnchorOfBounds = void 0;

const calculateAnchorOfBounds = (bounds, anchorType) => {
    const {x1: x1, x2: x2, y1: y1, y2: y2} = bounds, rectWidth = Math.abs(x2 - x1), rectHeight = Math.abs(y2 - y1);
    let anchorX = (x1 + x2) / 2, anchorY = (y1 + y2) / 2, sx = 0, sy = 0;
    switch (anchorType) {
      case "top":
      case "inside-top":
        sy = -.5;
        break;

      case "bottom":
      case "inside-bottom":
        sy = .5;
        break;

      case "left":
      case "inside-left":
        sx = -.5;
        break;

      case "right":
      case "inside-right":
        sx = .5;
        break;

      case "top-right":
        sx = .5, sy = -.5;
        break;

      case "top-left":
        sx = -.5, sy = -.5;
        break;

      case "bottom-right":
        sx = .5, sy = .5;
        break;

      case "bottom-left":
        sx = -.5, sy = .5;
    }
    return anchorX += sx * rectWidth, anchorY += sy * rectHeight, {
        x: anchorX,
        y: anchorY
    };
};

exports.calculateAnchorOfBounds = calculateAnchorOfBounds;

const aabbSeparation = (a, b) => Math.max(b.x1 - a.x2, a.x1 - b.x2, b.y1 - a.y2, a.y1 - b.y2);

exports.aabbSeparation = aabbSeparation;

const obbSeparation = (a, b) => {
    const axes = [ {
        x: Math.cos(a.angle),
        y: Math.sin(a.angle)
    }, {
        x: -Math.sin(a.angle),
        y: Math.cos(a.angle)
    }, {
        x: Math.cos(b.angle),
        y: Math.sin(a.angle)
    }, {
        x: -Math.sin(b.angle),
        y: Math.cos(a.angle)
    } ];
    function getProjectionRange(obb, axisX, axisY) {
        const projections = obb.getRotatedCorners().map((p => p.x * axisX + p.y * axisY));
        return {
            min: Math.min(...projections),
            max: Math.max(...projections)
        };
    }
    let maxDistance = 0;
    for (const axis of axes) {
        const rangeA = getProjectionRange(a, axis.x, axis.y), rangeB = getProjectionRange(b, axis.x, axis.y);
        let distance;
        distance = rangeA.max < rangeB.min ? rangeB.min - rangeA.max : rangeB.max < rangeA.min ? rangeA.min - rangeB.max : 0, 
        maxDistance = Math.max(maxDistance, distance);
    }
    return maxDistance;
};

exports.obbSeparation = obbSeparation;
//# sourceMappingURL=bounds-util.js.map
