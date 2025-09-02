import { array, last, merge } from "@visactor/vutils";

import { DEFAULT_STATES } from "../../constant";

import { Tag } from "../../tag";

export class MarkLabelMixin {
    getLabel() {
        return this._label;
    }
    _addMarkLabels(container, labelName, defaultLabelAttrs) {
        const {label: label, state: state} = this.attribute, labelStates = array(null == state ? void 0 : state.label), labelBackgroundStates = array(null == state ? void 0 : state.labelBackground), labelShapes = array(label).map(((labelAttrs, index) => {
            var _a, _b;
            const finalLabelAttrs = merge({}, defaultLabelAttrs, labelAttrs), markLabel = new Tag(Object.assign(Object.assign({}, finalLabelAttrs), {
                state: {
                    panel: merge({}, DEFAULT_STATES, null !== (_a = labelBackgroundStates[index]) && void 0 !== _a ? _a : last(labelBackgroundStates)),
                    text: merge({}, DEFAULT_STATES, null !== (_b = labelStates[index]) && void 0 !== _b ? _b : last(labelStates))
                }
            }));
            return markLabel.name = labelName, container.add(markLabel), this.setLabelPos(markLabel, finalLabelAttrs), 
            markLabel;
        }));
        this._label = 1 === array(labelShapes).length ? labelShapes[0] : labelShapes;
    }
    _updateMarkLabels(defaultLabelAttrs) {
        const {label: label, state: state} = this.attribute, labelShapes = array(this._label), labelStates = array(null == state ? void 0 : state.label), labelBackgroundStates = array(null == state ? void 0 : state.labelBackground);
        if (labelShapes.length) {
            const labels = array(label);
            labelShapes.forEach(((labelItem, index) => {
                var _a, _b;
                const finalLabelAttrs = merge({}, defaultLabelAttrs, labels[index]);
                labelItem.setAttributes(Object.assign(Object.assign({
                    dx: 0,
                    dy: 0
                }, finalLabelAttrs), {
                    state: {
                        panel: merge({}, DEFAULT_STATES, null !== (_a = labelBackgroundStates[index]) && void 0 !== _a ? _a : last(labelBackgroundStates)),
                        text: merge({}, DEFAULT_STATES, null !== (_b = labelStates[index]) && void 0 !== _b ? _b : last(labelStates))
                    }
                })), this.setLabelPos(labelItem, finalLabelAttrs);
            }));
        }
    }
}
//# sourceMappingURL=label.js.map
