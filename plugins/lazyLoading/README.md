## Lazy-loading

Wait for lazy-loaded or delayed elements on the page before showing related tour step.

### Use Cases

- Plugin makes GuideChimp wait for lazy-loaded or delayed elements (post-rendering, rerouting, etc.)
- Support dynamically created DOM elements with the frameworks, such as Angular, Vue.js, React, etc.

### Installation

Please refer to the plugins' installation and configuration Wiki [page](https://github.com/Labs64/GuideChimp/wiki/Configure#plugins).

### Options
- `timeout`: time (in milliseconds) after which waiting for an element will be interrupted (default: 5000)
- `frequency`: indicates how often (in milliseconds) an element availability check will be performed (default: 100)

### How To Use

```javascript
GuideChimp.extend(guideChimpPluginLazyLoading, { timeout: 15000, frequency: 500 });
```

### Examples

-  Lazy-loading (plugin) - https://codepen.io/netlicensing/full/PozXbPR
-  Lazy-loading (using `onBeforeChange()`) - https://codepen.io/netlicensing/full/yLJRbeY
