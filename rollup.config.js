import {defineConfig} from 'rollup'
import {terser} from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

const production = !process.env.ROLLUP_WATCH

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        sourcemap: !production,
        format: 'cjs',
        name: 'app',
        file: 'build/index.js'
      },
      production && {
        sourcemap: !production,
        format: 'es',
        name: 'app',
        file: 'build/index.es.js'
      }
    ],
    plugins: [
      typescript({
        sourceMap: !production,
        inlineSources: !production,
        tsconfig: './tsconfig.json'
      }),

      production && terser()
    ],
    watch: {
      clearScreen: false
    }
  },
  {
    input: 'src/types.d.ts',
    output: [{file: 'build/_types/types.d.ts', format: 'es'}],
    plugins: [dts()],
    watch: {
      clearScreen: false
    }
  },
  {
    input: 'build/_types/index.d.ts',
    output: [{file: 'build/index.d.ts', format: 'es'}],
    plugins: [dts()],
    watch: {
      clearScreen: false
    }
  }
])
