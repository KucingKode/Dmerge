import type {mergeFunc, parseFunc, stringifyFunc} from './types'

export function createMerger<Options = object>(args: {
  parse: parseFunc<Options>
  stringify: stringifyFunc<Options>
}): mergeFunc<Options> {
  const {parse, stringify} = args

  return (target, sources, options?: Options) => {
    console.log(sources)
    if (typeof sources === 'string') sources = [sources]

    const data = deepMerge(parse(target, options), ...sources.map((src) => parse(src, options)))

    return {
      data: data,
      string: () => stringify(data, options)
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
