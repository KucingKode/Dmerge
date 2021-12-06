const YAML = require('yaml')
const TOML = require('@iarna/toml')

exports.object = () => {
  return JSON.parse(
    JSON.stringify({
      object1: {
        a: 'a',
        d: 123,
        b: [1, 2, true],
        c: {
          a1: 'a1'
        }
      },

      object2: {
        a: 'a1',
        b: [3, 4, false],
        c: {
          a: 'a1',
          a1: 'a2'
        }
      },

      mergedObject: {
        a: 'a1',
        d: 123,
        b: [1, 2, true, 3, 4, false],
        c: {
          a1: 'a2',
          a: 'a1'
        }
      }
    })
  )
}

// --------------------- data strings ---------------------------------

const obj = exports.object()

exports.json = {
  data1: JSON.stringify(obj.object1),
  data2: JSON.stringify(obj.object2),
  merged: obj.mergedObject,
  mergedstr: JSON.stringify(obj.mergedObject)
}

exports.env = {
  data1: 'PORT=3000\nPATH=./test\nSTATUS=OK',
  data2: 'LIMIT=60\nSTATUS=ERR',
  merged: {PORT: '3000', PATH: './test', STATUS: 'ERR', LIMIT: '60'},
  mergedstr: 'PORT=3000\nPATH=./test\nSTATUS=ERR\nLIMIT=60'
}

exports.list = {
  data1: 'a\nb\nc',
  data2: 'c\nd',
  merged: {
    a: true,
    b: true,
    c: true,
    d: true
  },
  mergedstr: 'a\nb\nc\nd'
}

exports.yaml = {
  data1: YAML.stringify(obj.object1),
  data2: YAML.stringify(obj.object2),
  merged: obj.mergedObject,
  mergedstr: YAML.stringify(obj.mergedObject)
}

const tomlObj = {
  object1: {
    identity: {
      NAME: 'Martin Dev',
      JOB: ['developer', 'programmer']
    },
    skills: {GOOD: ['html'], BAD: ['C++']}
  },
  object2: {
    identity: {
      NAME: 'Martin Developer',
      AGE: 42,
      JOB: ['coder']
    },
    skills: {GOOD: ['css', 'js']}
  },

  mergedObject: {
    identity: {
      NAME: 'Martin Developer',
      JOB: ['developer', 'programmer', 'coder'],
      AGE: 42
    },
    skills: {GOOD: ['html', 'css', 'js'], BAD: ['C++']}
  }
}

exports.toml = {
  data1: TOML.stringify(tomlObj.object1),
  data2: TOML.stringify(tomlObj.object2),
  merged: tomlObj.mergedObject,
  mergedstr: TOML.stringify(tomlObj.mergedObject)
}
