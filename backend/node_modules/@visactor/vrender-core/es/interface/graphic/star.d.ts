import type { IPointLike } from '@visactor/vutils';
import type { IGraphicAttribute, IGraphic } from '../graphic';
export type IStarAttribute = {
    width: number;
    height: number;
    spikes: number;
    thickness: number;
};
export type IStarGraphicAttribute = Partial<IGraphicAttribute> & Partial<IStarAttribute>;
export type IStar = IGraphic<IStarGraphicAttribute> & {
    getCachedPoints: () => IPointLike[];
};
