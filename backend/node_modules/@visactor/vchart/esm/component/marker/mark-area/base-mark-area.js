import { computeClipRange, transformLabelAttributes, transformState, transformStyle, getMarkAreaProcessInfo } from "../utils";

import { transformToGraphic } from "../../../util/style";

import { BaseMarker } from "../base-marker";

import { LayoutZIndex } from "../../../constant/layout";

import { array } from "@visactor/vutils";

export class BaseMarkArea extends BaseMarker {
    constructor() {
        super(...arguments), this.specKey = "markArea", this.layoutZIndex = LayoutZIndex.MarkArea;
    }
    static _getMarkerCoordinateType(markerSpec) {
        const {doAngleProcess: doAngleProcess, doRadiusProcess: doRadiusProcess, doRadAngProcess: doRadAngProcess} = getMarkAreaProcessInfo(markerSpec);
        return "polar" === markerSpec.coordinateType || doAngleProcess || doRadiusProcess || doRadAngProcess ? "polar" : "cartesian";
    }
    _createMarkerComponent() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const label = array(null !== (_a = this._spec.label) && void 0 !== _a ? _a : {}), markAreaAttrs = {
            zIndex: this.layoutZIndex,
            interactive: null === (_b = this._spec.interactive) || void 0 === _b || _b,
            hover: null === (_c = this._spec.interactive) || void 0 === _c || _c,
            select: null === (_d = this._spec.interactive) || void 0 === _d || _d,
            points: [ {
                x: 0,
                y: 0
            } ],
            center: {
                x: 0,
                y: 0
            },
            innerRadius: 0,
            outerRadius: 0,
            startAngle: 0,
            endAngle: 0,
            areaStyle: transformStyle(transformToGraphic(null === (_e = this._spec.area) || void 0 === _e ? void 0 : _e.style), this._markerData, this._markAttributeContext),
            clipInRange: null !== (_f = this._spec.clip) && void 0 !== _f && _f,
            label: label.map((labelItem => transformLabelAttributes(labelItem, this._markerData, this._markAttributeContext))),
            state: {
                area: transformState(null === (_g = this._spec.area) || void 0 === _g ? void 0 : _g.state, this._markerData, this._markAttributeContext),
                label: label.map((labelItem => transformState(labelItem.state, this._markerData, this._markAttributeContext))),
                labelBackground: label.map((labelItem => {
                    var _a;
                    return transformState(null === (_a = labelItem.labelBackground) || void 0 === _a ? void 0 : _a.state, this._markerData, this._markAttributeContext);
                }))
            },
            animation: null !== (_h = this._spec.animation) && void 0 !== _h && _h,
            animationEnter: this._spec.animationEnter,
            animationExit: this._spec.animationExit,
            animationUpdate: this._spec.animationUpdate
        };
        return this._newMarkAreaComponent(markAreaAttrs);
    }
    _markerLayout() {
        var _a;
        const spec = this._spec, data = this._markerData, startRelativeSeries = this._startRelativeSeries, endRelativeSeries = this._endRelativeSeries, relativeSeries = this._relativeSeries, pointsAttr = this._computePointsAttr(), seriesData = this._getRelativeDataView().latestData, dataPoints = data ? data.latestData[0] && data.latestData[0].latestData ? data.latestData[0].latestData : data.latestData : seriesData;
        let limitRect;
        if (spec.clip || array(spec.label).some((labelCfg => null == labelCfg ? void 0 : labelCfg.confine))) {
            const {minX: minX, maxX: maxX, minY: minY, maxY: maxY} = computeClipRange([ startRelativeSeries.getRegion(), endRelativeSeries.getRegion(), relativeSeries.getRegion() ]);
            limitRect = {
                x: minX,
                y: minY,
                width: maxX - minX,
                height: maxY - minY
            };
        }
        if (this._markerComponent) {
            const prevLabelAttrs = array(null === (_a = this._markerComponent.attribute) || void 0 === _a ? void 0 : _a.label), specLabels = array(this._spec.label);
            this._markerComponent.setAttributes(Object.assign(Object.assign({}, pointsAttr), {
                label: prevLabelAttrs.map(((prevLabel, index) => {
                    const specLabel = specLabels[index] || {};
                    return Object.assign(Object.assign({}, prevLabel), {
                        text: specLabel.formatMethod ? specLabel.formatMethod(dataPoints, seriesData) : null == prevLabel ? void 0 : prevLabel.text
                    });
                })),
                limitRect: limitRect,
                dx: this._layoutOffsetX,
                dy: this._layoutOffsetY
            }));
        }
    }
    _initDataView() {
        const spec = this._spec, {doXProcess: doXProcess, doYProcess: doYProcess, doXYProcess: doXYProcess, doAngleProcess: doAngleProcess, doRadiusProcess: doRadiusProcess, doRadAngProcess: doRadAngProcess, doCoordinatesProcess: doCoordinatesProcess} = getMarkAreaProcessInfo(spec);
        if (!(doXProcess || doYProcess || doXYProcess || doAngleProcess || doRadiusProcess || doRadAngProcess || doCoordinatesProcess)) return null;
        this._initCommonDataView();
    }
}

BaseMarkArea.specKey = "markArea";
//# sourceMappingURL=base-mark-area.js.map
