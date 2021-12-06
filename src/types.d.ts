export interface parseFunc<Options> {
  (str: string, options?: Options): object
}
export interface stringifyFunc<Options> {
  (obj: object, option?: Options): string
}

export interface mergeFunc<Options> {
  (target: string, sources: string | string[], options?: Options): {
    data: object
    string: () => string
  }
}
