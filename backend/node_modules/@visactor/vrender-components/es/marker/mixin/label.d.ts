import type { IGroup } from '@visactor/vrender-core';
import type { TagAttributes } from '../../tag';
import { Tag } from '../../tag';
export interface MarkLabelMixin<T extends {
    label?: any;
    state?: any;
}> {
    attribute: T;
    setLabelPos: (labelNode: IGroup, labelAttrs: any) => any;
}
export declare class MarkLabelMixin<T> {
    _label: Tag | Tag[];
    getLabel(): Tag | Tag[];
    _addMarkLabels(container: IGroup, labelName: string, defaultLabelAttrs: TagAttributes): void;
    _updateMarkLabels(defaultLabelAttrs: TagAttributes): void;
}
