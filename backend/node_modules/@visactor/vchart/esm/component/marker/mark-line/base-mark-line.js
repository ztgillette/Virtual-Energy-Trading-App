import { DataView } from "@visactor/vdataset";

import { markerAggregation } from "../../../data/transforms/aggregation";

import { computeClipRange, transformLabelAttributes, transformState, transformStyle, getMarkLineProcessInfo } from "../utils";

import { registerDataSetInstanceTransform } from "../../../data/register";

import { transformToGraphic } from "../../../util/style";

import { BaseMarker } from "../base-marker";

import { markerRegression } from "../../../data/transforms/regression";

import { LayoutZIndex } from "../../../constant/layout";

import { markerFilter } from "../../../data/transforms/marker-filter";

import { array } from "@visactor/vutils";

export class BaseMarkLine extends BaseMarker {
    constructor() {
        super(...arguments), this.specKey = "markLine", this.layoutZIndex = LayoutZIndex.MarkLine;
    }
    static _getMarkerCoordinateType(markerSpec) {
        const {doAngleProcess: doAngleProcess, doRadiusProcess: doRadiusProcess, doAngRadRad1Process: doAngRadRad1Process, doRadAngAng1Process: doRadAngAng1Process, doRadAngProcess: doRadAngProcess} = getMarkLineProcessInfo(markerSpec);
        return "polar" === markerSpec.coordinateType || doAngleProcess || doRadiusProcess || doAngRadRad1Process || doRadAngAng1Process || doRadAngProcess ? "polar" : "cartesian";
    }
    _createMarkerComponent() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const {startSymbol: startSymbol = {}, endSymbol: endSymbol = {}} = this._spec, label = array(null !== (_a = this._spec.label) && void 0 !== _a ? _a : {}), markLineAttrs = {
            zIndex: this.layoutZIndex,
            interactive: null === (_b = this._spec.interactive) || void 0 === _b || _b,
            hover: null === (_c = this._spec.interactive) || void 0 === _c || _c,
            select: null === (_d = this._spec.interactive) || void 0 === _d || _d,
            points: [ {
                x: 0,
                y: 0
            }, {
                x: 0,
                y: 0
            } ],
            center: {
                x: 0,
                y: 0
            },
            radius: 0,
            startAngle: 0,
            endAngle: 0,
            lineStyle: transformStyle(transformToGraphic(null === (_e = this._spec.line) || void 0 === _e ? void 0 : _e.style), this._markerData, this._markAttributeContext),
            clipInRange: null !== (_f = this._spec.clip) && void 0 !== _f && _f,
            label: label.map((labelItem => transformLabelAttributes(labelItem, this._markerData, this._markAttributeContext))),
            state: {
                line: transformState(null !== (_h = null === (_g = this._spec.line) || void 0 === _g ? void 0 : _g.state) && void 0 !== _h ? _h : {}, this._markerData, this._markAttributeContext),
                lineStartSymbol: transformState(null !== (_k = null === (_j = this._spec.startSymbol) || void 0 === _j ? void 0 : _j.state) && void 0 !== _k ? _k : {}, this._markerData, this._markAttributeContext),
                lineEndSymbol: transformState(null !== (_m = null === (_l = this._spec.endSymbol) || void 0 === _l ? void 0 : _l.state) && void 0 !== _m ? _m : {}, this._markerData, this._markAttributeContext),
                label: label.map((labelItem => {
                    var _a;
                    return transformState(null !== (_a = labelItem.state) && void 0 !== _a ? _a : {}, this._markerData, this._markAttributeContext);
                })),
                labelBackground: label.map((labelItem => {
                    var _a, _b;
                    return transformState(null !== (_b = null === (_a = labelItem.labelBackground) || void 0 === _a ? void 0 : _a.state) && void 0 !== _b ? _b : {}, this._markerData, this._markAttributeContext);
                }))
            },
            animation: null !== (_o = this._spec.animation) && void 0 !== _o && _o,
            animationEnter: this._spec.animationEnter,
            animationExit: this._spec.animationExit,
            animationUpdate: this._spec.animationUpdate
        };
        startSymbol.visible ? markLineAttrs.startSymbol = Object.assign(Object.assign({}, startSymbol), {
            visible: !0,
            style: transformStyle(transformToGraphic(startSymbol.style), this._markerData, this._markAttributeContext)
        }) : markLineAttrs.startSymbol = {
            visible: !1
        }, endSymbol.visible ? markLineAttrs.endSymbol = Object.assign(Object.assign({}, endSymbol), {
            visible: !0,
            style: transformStyle(transformToGraphic(endSymbol.style), this._markerData, this._markAttributeContext)
        }) : markLineAttrs.endSymbol = {
            visible: !1
        };
        return this._newMarkLineComponent(markLineAttrs);
    }
    _getUpdateMarkerAttrs() {
        var _a, _b;
        const spec = this._spec, data = this._markerData, startRelativeSeries = this._startRelativeSeries, endRelativeSeries = this._endRelativeSeries, relativeSeries = this._relativeSeries, pointsAttr = this._computePointsAttr(), seriesData = relativeSeries.getViewData().latestData, dataPoints = data.latestData[0] && data.latestData[0].latestData ? data.latestData[0].latestData : data.latestData;
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
        const markerComponentAttr = null !== (_b = null === (_a = this._markerComponent) || void 0 === _a ? void 0 : _a.attribute) && void 0 !== _b ? _b : {}, prevLabelAttrs = array(markerComponentAttr.label), specLabels = array(this._spec.label), labelAttrs = prevLabelAttrs.map(((prevLabel, index) => {
            const specLabel = specLabels[index] || {};
            return Object.assign(Object.assign({}, prevLabel), {
                text: specLabel.formatMethod ? specLabel.formatMethod(dataPoints, seriesData) : null == prevLabel ? void 0 : prevLabel.text
            });
        }));
        return Object.assign(Object.assign({}, pointsAttr), {
            label: labelAttrs,
            limitRect: limitRect,
            dx: this._layoutOffsetX,
            dy: this._layoutOffsetY
        });
    }
    _markerLayout() {
        var _a;
        const updateAttrs = this._getUpdateMarkerAttrs();
        null === (_a = this._markerComponent) || void 0 === _a || _a.setAttributes(updateAttrs);
    }
    _initDataView() {
        const spec = this._spec, isCoordinateProcess = "coordinates" in spec, {doXProcess: doXProcess, doYProcess: doYProcess, doXYY1Process: doXYY1Process, doYXX1Process: doYXX1Process, doXYProcess: doXYProcess, doAngleProcess: doAngleProcess, doRadiusProcess: doRadiusProcess, doAngRadRad1Process: doAngRadRad1Process, doRadAngAng1Process: doRadAngAng1Process, doRadAngProcess: doRadAngProcess} = getMarkLineProcessInfo(spec);
        if (this._markerData = this._getRelativeDataView(), !(doXProcess || doYProcess || doXYY1Process || doYXX1Process || doXYProcess || doAngleProcess || doRadiusProcess || doAngRadRad1Process || doRadAngAng1Process || doRadAngProcess || isCoordinateProcess)) return;
        registerDataSetInstanceTransform(this._option.dataSet, "markerAggregation", markerAggregation), 
        registerDataSetInstanceTransform(this._option.dataSet, "markerRegression", markerRegression), 
        registerDataSetInstanceTransform(this._option.dataSet, "markerFilter", markerFilter);
        const {options: options, needAggr: needAggr, needRegr: needRegr, processData: processData} = this._computeOptions(), data = new DataView(this._option.dataSet);
        data.parse([ processData ], {
            type: "dataview"
        }), needAggr && data.transform({
            type: "markerAggregation",
            options: options
        }), needRegr && data.transform({
            type: "markerRegression",
            options: options
        }), data.transform({
            type: "markerFilter",
            options: this._getAllRelativeSeries()
        }), data.target.on("change", (() => {
            this._markerLayout();
        })), this._markerData = data;
    }
}

BaseMarkLine.specKey = "markLine";
//# sourceMappingURL=base-mark-line.js.map
