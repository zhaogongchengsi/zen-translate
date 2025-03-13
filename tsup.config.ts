import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  target: 'node18',
  outDir: 'dist',
  clean: true,
  minify: true,
  external: [
    'vscode'
  ],
  noExternal: ['tencentcloud-sdk-nodejs-tmt']
})
