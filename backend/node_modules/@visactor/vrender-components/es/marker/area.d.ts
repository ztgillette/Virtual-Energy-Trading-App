import type { IGroup, IPolygon } from '@visactor/vrender-core';
import type { Tag } from '../tag';
import { Marker } from './base';
import type { CommonMarkAreaAnimationType, IMarkAreaLabelPosition, MarkAreaAttrs, MarkerAnimationState, MarkerAreaLabelAttrs } from './type';
import type { ComponentOptions } from '../interface';
import { MarkLabelMixin } from './mixin/label';
export declare function registerMarkAreaAnimate(): void;
export interface MarkArea extends Pick<MarkLabelMixin<MarkAreaAttrs>, '_addMarkLabels' | '_updateMarkLabels' | 'getLabel' | '_label'>, Marker<MarkAreaAttrs, CommonMarkAreaAnimationType> {
}
export declare class MarkArea extends Marker<MarkAreaAttrs, CommonMarkAreaAnimationType> {
    name: string;
    static defaultAttributes: {
        interactive: boolean;
        label: {
            position: IMarkAreaLabelPosition;
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
    defaultUpdateAnimation: never;
    defaultExitAnimation: import("./type").MarkerExitAnimation;
    protected markerAnimate(state: MarkerAnimationState): void;
    private _area;
    getArea(): IPolygon;
    constructor(attributes: MarkAreaAttrs, options?: ComponentOptions);
    protected getPointAttrByPosition(position: IMarkAreaLabelPosition): {
        x: number;
        y: number;
    };
    protected setLabelPos(labelNode: Tag, labelAttrs: MarkerAreaLabelAttrs): void;
    protected initMarker(container: IGroup): void;
    protected updateMarker(): void;
    protected isValidPoints(): boolean;
}
