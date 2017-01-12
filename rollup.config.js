import replace from 'rollup-plugin-replace';
export default {
  entry: 'dist/index.js',
  format: 'cjs',
  plugins: [
    replace({ 'typeof document !== \'undefined\'': !!process.env.BROWSER })
  ]
};
