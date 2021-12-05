import {describe, test, expect} from '@jest/globals'

import * as utilities from '../src/utilities'
import {object} from './_dataset'

describe('test deepMerge function', () => {
  let {object1, object2, mergedObject} = object()

  const merged = utilities.deepMerge(object1, object2)

  test('deepMerge should return object', () => {
    expect(typeof merged).toBe('object')
    expect(Array.isArray(merged)).toBeFalsy()
  })

  test('deepMerge should correctly merge nested object', () => {
    expect(merged).toEqual(mergedObject)
  })
})

describe('test createMerger function', () => {
  let {object1, object2, mergedObject} = object()

  const merge = utilities.createMerger({
    parse: JSON.parse,
    stringify: JSON.stringify
  })

  test('it should return a function', () => {
    expect(typeof merge).toBe('function')
  })

  test('merge function should return merged data', () => {
    const merged = merge(JSON.stringify(object1), JSON.stringify(object2))

    expect(typeof merged.data).toBe('object')
    expect(merged.data).toEqual(mergedObject)
  })

  test('merge function should return string function that return merged string', () => {
    const merged = merge(JSON.stringify(object1), JSON.stringify(object2))

    expect(typeof merged.string).toBe('function')
    expect(merged.string()).toBe(JSON.stringify(mergedObject))
  })
})
