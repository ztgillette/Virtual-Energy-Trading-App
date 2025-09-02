export type FieldGetterFunction = (val: any) => any;
export type Getter = (path: string[]) => FieldGetterFunction;
export type FieldOption = {
    field: string;
};
export type TagItemAttribute<T> = T | ((d?: any) => T);
export interface FieldGetterGeneratorOptions {
    get?: Getter;
}
export declare const getter: (path: string[]) => any;
export declare const field: (fieldStr: string | string[] | FieldGetterFunction | FieldGetterFunction[], opt?: FieldGetterGeneratorOptions) => any;
export declare const simpleField: <T>(option: FieldOption | TagItemAttribute<T>) => (datum: any) => any;
