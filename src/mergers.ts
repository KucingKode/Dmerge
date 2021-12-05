import * as YAML from 'yaml'
import * as TOML from '@iarna/toml'

import {createMerger} from './utilities'

export const mergeYaml = createMerger({
  parse: YAML.parse,
  stringify: YAML.stringify
})

export const mergeJson = createMerger({
  parse: JSON.parse,
  stringify: JSON.stringify
})

export const mergeToml = createMerger({
  parse: TOML.parse,
  stringify: TOML.stringify
})

export const mergeEnv = createMerger({
  parse: (str) => {
    const data = {}

    str
      .split('\n')
      .map((str) => {
        const i = str.indexOf('=')
        if (i < 0) return []

        return [str.substring(0, i), str.substring(i + 1)]
      })
      .filter((pair) => pair.length === 2)
      .forEach((pair) => (data[pair[0]] = pair[1]))

    return data
  },
  stringify: (obj) => {
    let str = ''
    Object.keys(obj).forEach((key) => {
      str += `${key}=${obj[key]}\n`
    })

    return str.replace(/\n$/, '')
  }
})

export const mergeList = createMerger({
  parse: (str) => {
    const obj = {}
    str.split('\n').forEach((val) => (obj[val] = true))

    return obj
  },
  stringify: (obj: object) => {
    let str = ''
    Object.keys(obj).forEach((val) => {
      str += `${val}\n`
    })

    return str.replace(/\n$/, '')
  }
})
