import type { IArc, IGroup } from '@visactor/vrender-core';
import type { Tag } from '../tag';
import { Marker } from './base';
import type { CommonMarkAreaAnimationType, MarkerAnimationState, MarkerArcAreaLabelAttrs } from './type';
import { IMarkCommonArcLabelPosition, type MarkArcAreaAttrs } from './type';
import type { ComponentOptions } from '../interface';
import { MarkLabelMixin } from './mixin/label';
export declare function registerMarkArcAreaAnimate(): void;
export interface MarkArcArea extends Pick<MarkLabelMixin<MarkArcAreaAttrs>, '_addMarkLabels' | '_updateMarkLabels' | 'getLabel' | '_label'>, Marker<MarkArcAreaAttrs, CommonMarkAreaAnimationType> {
}
export declare class MarkArcArea extends Marker<MarkArcAreaAttrs, CommonMarkAreaAnimationType> {
    name: string;
    static defaultAttributes: {
        interactive: boolean;
        label: {
            autoRotate: boolean;
            position: IMarkCommonArcLabelPosition;
            textStyle: {
                fill: string;
                stroke: string;
                lineWidth: number;
                fontSize: number;
                fontWeight: string;
                fontStyle: string;
            };
            padding: number[];
            panel: {
                visible: boolean;
                cornerRadius: number;
                fill: string;
                fillOpacity: number;
            };
        };
        areaStyle: {
            fill: string;
            visible: boolean;
        };
    };
    private _area;
    defaultUpdateAnimation: never;
    defaultExitAnimation: import("./type").MarkerExitAnimation;
    protected markerAnimate(state: MarkerAnimationState): void;
    getArea(): IArc;
    constructor(attributes: MarkArcAreaAttrs, options?: ComponentOptions);
    protected getPointAttrByPosition(position: IMarkCommonArcLabelPosition, labelAttrs: MarkerArcAreaLabelAttrs): {
        position: {
            x: number;
            y: number;
        };
        angle: number;
    };
    protected setLabelPos(labelNode: Tag, labelAttrs: MarkerArcAreaLabelAttrs): void;
    protected initMarker(container: IGroup): void;
    protected updateMarker(): void;
    protected isValidPoints(): boolean;
}
