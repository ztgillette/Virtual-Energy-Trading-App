import type { EasingType, IArc, IImage, ILine, IPolygon, IRichText, ISymbol } from '@visactor/vrender-core';
import type { ArcSegment, Segment } from '../../segment';
import type { Tag } from '../../tag';
export declare function commonLineFadeIn(line: Segment | ArcSegment, label: Tag | Tag[], duration: number, delay: number, easing: EasingType): void;
export declare function areaFadeIn(area: IPolygon, label: Tag | Tag[], duration: number, delay: number, easing: EasingType): void;
export declare function arcAreaFadeIn(area: IArc, label: Tag | Tag[], duration: number, delay: number, easing: EasingType): void;
export declare function pointFadeIn(itemLine: Segment, decorativeLine: ILine, item: Tag | IRichText | ISymbol | IImage, duration: number, delay: number, easing: EasingType): void;
