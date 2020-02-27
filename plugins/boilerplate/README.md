# GuideChimp plugin boilerplate
A full-featured Webpack setup for creating plugins for the GuideChimp library with the ability to  hot-reload, lint-on-save, unit testing.

## Commands
- `npm run dev`: first-in-class development experience.
  - Webpack
  - State preserving hot-reload
  - State preserving compilation error overlay
  - Lint-on-save with ESLint
  - Source maps

- `npm run build` - Production ready build.
    - JavaScript minified with [UglifyJS v3](https://github.com/mishoo/UglifyJS2/tree/harmony).
    - Use `npm run build --report` to build with bundle size analytics.

- `npm run unit`: Unit tests run in Chrome with Karma + Jasmine + karma-webpack.
  - Supports ES2015+ in test files.
  - Easy mocking.

## Plugin tips
```javascript
/**
 *
 * @param {Class} cls GuideChimp class
 * @param {Object} factory GuideChimp factory
 * @param {Array} args any arguments for the needs of your plugin, for example: options object
 */
module.exports = (cls, factory, ...args) => {
     // extend GuideChimp() class
     // e.g. add GuideChimp(tour).someMyMethod()
     cls.prototype.someMyMethod = (...args) => {};
 
     // extend GuideChimp factory
     // e.g. add GuideChimp.someMyMethod()
     factory.someMyMethod = (...args) => {};
 
     // overriding existing API
     // e.g. extend GuideChimp().init()
     const parentInit = cls.prototype.init;
     cls.prototype.init = () => {
         parentInit();
 
         // some my extra code
         //...
     };
 };
```