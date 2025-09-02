import { graphicFadeIn } from "./common";

import { array } from "@visactor/vutils";

export function commonLineClipIn(line, label, duration, delay, easing) {
    const startSymbolDuration = .1 * duration, lineDuration = .7 * duration, endSymbolDuration = .1 * duration, labelDuration = .1 * duration;
    graphicFadeIn(line.startSymbol, delay, startSymbolDuration, easing), line.lines.forEach((line => line.setAttribute("clipRange", 0))), 
    line.lines.forEach(((l, index) => {
        const stepDuration = lineDuration / line.lines.length;
        l.animate().wait(delay + startSymbolDuration + index * stepDuration).to({
            clipRange: 1
        }, stepDuration, easing);
    })), graphicFadeIn(line.endSymbol, delay + startSymbolDuration + lineDuration, endSymbolDuration, easing), 
    array(label).forEach((labelNode => {
        const delayTime = delay + startSymbolDuration + lineDuration + endSymbolDuration;
        graphicFadeIn(labelNode.getTextShape(), delayTime, labelDuration, easing), graphicFadeIn(labelNode.getBgRect(), delayTime, labelDuration, easing);
    }));
}
//# sourceMappingURL=clip-in.js.map
