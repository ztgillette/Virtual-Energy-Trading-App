import type { IGraphicAttribute, IContext2d, IMarkAttribute, IStar, IThemeAttribute, IGraphicRender, IContributionProvider, IDrawContext, IGraphicRenderDrawParams, IRenderService, IStarRenderContribution } from '../../../interface';
import { BaseRender } from './base-render';
export declare class DefaultCanvasStarRender extends BaseRender<IStar> implements IGraphicRender {
    protected readonly starRenderContribitions: IContributionProvider<IStarRenderContribution>;
    type: 'star';
    numberType: number;
    constructor(starRenderContribitions: IContributionProvider<IStarRenderContribution>);
    drawShape(star: IStar, context: IContext2d, x: number, y: number, drawContext: IDrawContext, params?: IGraphicRenderDrawParams, fillCb?: (ctx: IContext2d, markAttribute: Partial<IMarkAttribute & IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean, strokeCb?: (ctx: IContext2d, markAttribute: Partial<IMarkAttribute & IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean): void;
    draw(star: IStar, renderService: IRenderService, drawContext: IDrawContext, params?: IGraphicRenderDrawParams): void;
}
