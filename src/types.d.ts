export type parseFunc = (str: string) => object
export type stringifyFunc = (obj: object) => string

export type MergeFunc = (
  target: string,
  ...sources: string[]
) => {
  data: object
  string: () => string
}
