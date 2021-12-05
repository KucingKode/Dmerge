export const object = () => {
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

const obj = object()
export const json = {
  data1: JSON.stringify(obj.object1),
  data2: JSON.stringify(obj.object2),
  merged: obj.mergedObject,
  mergedstr: JSON.stringify(obj.mergedObject, null, 2)
}

export const env = {
  data1: 'PORT=3000\nPATH=./test\nSTATUS=OK',
  data2: 'LIMIT=60\nSTATUS=ERR',
  merged: {PORT: '3000', PATH: './test', STATUS: 'ERR', LIMIT: '60'},
  mergedstr: 'PORT=3000\nPATH=./test\nSTATUS=ERR\nLIMIT=60'
}

export const list = {
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

export const yaml = {
  data1: `name: Martin D'vloper
job: [developer, programmer]
skills:
  - python
  - perl
  - pascal`,
  data2: `name: Martin Developer
job: [coder]
skills:
  - html
  - css`,
  merged: {
    name: 'Martin Developer',
    job: ['developer', 'programmer', 'coder'],
    skills: ['python', 'perl', 'pascal', 'html', 'css']
  },
  mergedstr: `name: Martin Developer
job:
  - developer
  - programmer
  - coder
skills:
  - python
  - perl
  - pascal
  - html
  - css
`
}

export const toml = {
  data1: `[identity]
NAME = "Martin D'vloper"
AGE = 42
JOB = ["developer", "programmer"]

[skills]
GOOD = ["html", "css"]
BAD = ["C++"]`,

  data2: `[identity]
NAME = "Martin Developer"
JOB = ["coder"]

[skills]
GOOD = ["js"]`,
  merged: {
    identity: {
      NAME: 'Martin Developer',
      AGE: 42,
      JOB: ['developer', 'programmer', 'coder']
    },
    skills: {GOOD: ['html', 'css', 'js'], BAD: ['C++']}
  },
  mergedstr: `[identity]
NAME = "Martin Developer"
AGE = 42
JOB = [ "developer", "programmer", "coder" ]

[skills]
GOOD = [ "html", "css", "js" ]
BAD = [ "C++" ]
`
}
