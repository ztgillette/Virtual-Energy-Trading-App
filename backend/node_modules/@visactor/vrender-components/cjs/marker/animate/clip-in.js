"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.commonLineClipIn = void 0;

const common_1 = require("./common"), vutils_1 = require("@visactor/vutils");

function commonLineClipIn(line, label, duration, delay, easing) {
    const startSymbolDuration = .1 * duration, lineDuration = .7 * duration, endSymbolDuration = .1 * duration, labelDuration = .1 * duration;
    (0, common_1.graphicFadeIn)(line.startSymbol, delay, startSymbolDuration, easing), 
    line.lines.forEach((line => line.setAttribute("clipRange", 0))), line.lines.forEach(((l, index) => {
        const stepDuration = lineDuration / line.lines.length;
        l.animate().wait(delay + startSymbolDuration + index * stepDuration).to({
            clipRange: 1
        }, stepDuration, easing);
    })), (0, common_1.graphicFadeIn)(line.endSymbol, delay + startSymbolDuration + lineDuration, endSymbolDuration, easing), 
    (0, vutils_1.array)(label).forEach((labelNode => {
        const delayTime = delay + startSymbolDuration + lineDuration + endSymbolDuration;
        (0, common_1.graphicFadeIn)(labelNode.getTextShape(), delayTime, labelDuration, easing), 
        (0, common_1.graphicFadeIn)(labelNode.getBgRect(), delayTime, labelDuration, easing);
    }));
}

exports.commonLineClipIn = commonLineClipIn;
//# sourceMappingURL=clip-in.js.map
