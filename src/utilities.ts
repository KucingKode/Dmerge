import type {MergeFunc, parseFunc, stringifyFunc} from './types'

export function createMerger(args: {parse: parseFunc; stringify: stringifyFunc}): MergeFunc {
  const {parse, stringify} = args

  return (target, ...sources) => {
    const data = deepMerge(parse(target), ...sources.map((src) => parse(src)))

    return {
      data: data,
      string: () => stringify(data)
    }
  }
}

export function deepMerge(target: object, ...sources: object[]): object {
  // deep merge two object

  if (!sources.length) return target
  const source = sources.shift()

  const isObject = (item: object) => item && typeof item === 'object' && !Array.isArray(item)
  const isArray = (item: object) => Array.isArray(item)

  if (isArray(target) && isArray(source)) {
    ;(target as any[]).push(...(source as any[]))
    return deepMerge(target, ...sources)
  }

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const item = source[key]

      if (isObject(item)) {
        if (!target[key]) Object.assign(target, {[key]: {}})
        deepMerge(target[key], item)
        return
      }

      isArray(item) && isArray(target[key])
        ? (target[key] as any[]).push(...item)
        : Object.assign(target, {[key]: item})
    })

    return deepMerge(target, ...sources)
  }

  throw new Error(`Array cannot be merged with object`)
}
