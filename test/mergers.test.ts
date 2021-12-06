const mergers = require('../build/index')
const dataset = require('./_dataset')

const formats = ['json', 'env', 'list', 'yaml', 'toml']

const capitalize = (str: string) => {
  const capital = str.substr(0, 1).toUpperCase()
  return capital + str.substring(1)
}

describe('test mergers', () => {
  formats.forEach((format) => {
    test(`merge${capitalize(format)} must correctly merge data`, () => {
      const merged = mergers[`merge${capitalize(format)}`](
        dataset[format].data1,
        dataset[format].data2
      )

      expect(typeof merged.data).toBe('object')
      expect(typeof merged.string).toBe('function')

      expect(merged.data).toEqual(dataset[format].merged)
      expect(merged.string()).toBe(dataset[format].mergedstr)
    })
  })
})
