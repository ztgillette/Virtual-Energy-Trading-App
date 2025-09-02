import type { IGroup } from '@visactor/vrender-core';
import type { ArcSegment, Segment } from '../segment';
import type { Tag } from '../tag';
import type { MarkCommonLineAnimationType, MarkCommonLineAttrs, MarkerAnimationState, MarkerLineLabelAttrs } from './type';
import { Marker } from './base';
import { MarkLabelMixin } from './mixin/label';
export interface MarkCommonLine<LineAttr, LabelPosition> extends Pick<MarkLabelMixin<MarkCommonLineAttrs<LineAttr, LabelPosition, MarkCommonLineAnimationType>>, '_addMarkLabels' | '_updateMarkLabels' | 'getLabel' | '_label'>, Marker<MarkCommonLineAttrs<LineAttr, LabelPosition, MarkCommonLineAnimationType>, MarkCommonLineAnimationType> {
}
export declare abstract class MarkCommonLine<LineAttr, LabelPosition> extends Marker<MarkCommonLineAttrs<LineAttr, LabelPosition, MarkCommonLineAnimationType>, MarkCommonLineAnimationType> {
    name: string;
    static _animate?: (line: Segment | ArcSegment, label: Tag | Tag[], animationConfig: any, state: MarkerAnimationState) => void;
    defaultUpdateAnimation: never;
    defaultExitAnimation: import("./type").MarkerExitAnimation;
    protected _line: Segment | ArcSegment;
    protected abstract createSegment(): any;
    protected abstract setLineAttributes(): any;
    protected abstract getPointAttrByPosition(position: any, labelAttrs: MarkerLineLabelAttrs<LabelPosition>): any;
    protected abstract getRotateByAngle(angle: number, labelAttrs: MarkerLineLabelAttrs<LabelPosition>): number;
    protected abstract getTextStyle(position: any, labelAngle: number, autoRotate: boolean): any;
    protected abstract markerAnimate(state: MarkerAnimationState): void;
    protected abstract addMarkLineLabels(container: IGroup): any;
    protected abstract updateMarkLineLabels(): any;
    getLine(): Segment | ArcSegment;
    protected setLabelPos(labelNode: IGroup, labelAttrs: MarkerLineLabelAttrs<LabelPosition>): void;
    protected initMarker(container: IGroup): void;
    protected updateMarker(): void;
}
