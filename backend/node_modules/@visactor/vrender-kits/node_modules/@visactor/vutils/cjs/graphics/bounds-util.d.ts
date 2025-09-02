import type { IBoundsLike, IOBBBounds } from '../data-structure';
export type InsideBoundsAnchorType = 'inside' | 'inside-top' | 'inside-bottom' | 'inside-left' | 'inside-right';
export type BoundsAnchorType = 'top' | 'bottom' | 'left' | 'right' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';
export declare const calculateAnchorOfBounds: (bounds: IBoundsLike, anchorType: string) => {
    x: number;
    y: number;
};
export declare const aabbSeparation: (a: IBoundsLike, b: IBoundsLike) => number;
export declare const obbSeparation: (a: IOBBBounds, b: IOBBBounds) => number;
