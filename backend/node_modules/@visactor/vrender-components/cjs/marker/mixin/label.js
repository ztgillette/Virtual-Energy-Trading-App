"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.MarkLabelMixin = void 0;

const vutils_1 = require("@visactor/vutils"), constant_1 = require("../../constant"), tag_1 = require("../../tag");

class MarkLabelMixin {
    getLabel() {
        return this._label;
    }
    _addMarkLabels(container, labelName, defaultLabelAttrs) {
        const {label: label, state: state} = this.attribute, labelStates = (0, vutils_1.array)(null == state ? void 0 : state.label), labelBackgroundStates = (0, 
        vutils_1.array)(null == state ? void 0 : state.labelBackground), labelShapes = (0, 
        vutils_1.array)(label).map(((labelAttrs, index) => {
            var _a, _b;
            const finalLabelAttrs = (0, vutils_1.merge)({}, defaultLabelAttrs, labelAttrs), markLabel = new tag_1.Tag(Object.assign(Object.assign({}, finalLabelAttrs), {
                state: {
                    panel: (0, vutils_1.merge)({}, constant_1.DEFAULT_STATES, null !== (_a = labelBackgroundStates[index]) && void 0 !== _a ? _a : (0, 
                    vutils_1.last)(labelBackgroundStates)),
                    text: (0, vutils_1.merge)({}, constant_1.DEFAULT_STATES, null !== (_b = labelStates[index]) && void 0 !== _b ? _b : (0, 
                    vutils_1.last)(labelStates))
                }
            }));
            return markLabel.name = labelName, container.add(markLabel), this.setLabelPos(markLabel, finalLabelAttrs), 
            markLabel;
        }));
        this._label = 1 === (0, vutils_1.array)(labelShapes).length ? labelShapes[0] : labelShapes;
    }
    _updateMarkLabels(defaultLabelAttrs) {
        const {label: label, state: state} = this.attribute, labelShapes = (0, vutils_1.array)(this._label), labelStates = (0, 
        vutils_1.array)(null == state ? void 0 : state.label), labelBackgroundStates = (0, 
        vutils_1.array)(null == state ? void 0 : state.labelBackground);
        if (labelShapes.length) {
            const labels = (0, vutils_1.array)(label);
            labelShapes.forEach(((labelItem, index) => {
                var _a, _b;
                const finalLabelAttrs = (0, vutils_1.merge)({}, defaultLabelAttrs, labels[index]);
                labelItem.setAttributes(Object.assign(Object.assign({
                    dx: 0,
                    dy: 0
                }, finalLabelAttrs), {
                    state: {
                        panel: (0, vutils_1.merge)({}, constant_1.DEFAULT_STATES, null !== (_a = labelBackgroundStates[index]) && void 0 !== _a ? _a : (0, 
                        vutils_1.last)(labelBackgroundStates)),
                        text: (0, vutils_1.merge)({}, constant_1.DEFAULT_STATES, null !== (_b = labelStates[index]) && void 0 !== _b ? _b : (0, 
                        vutils_1.last)(labelStates))
                    }
                })), this.setLabelPos(labelItem, finalLabelAttrs);
            }));
        }
    }
}

exports.MarkLabelMixin = MarkLabelMixin;
//# sourceMappingURL=label.js.map
