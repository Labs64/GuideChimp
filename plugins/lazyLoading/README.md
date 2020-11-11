## Lazy loading

### Use Cases

- Plugin makes GuideChimp wait for lazy-loaded or delayed elements (post-rendering, rerouting, etc.)

### Installation

Please refer to the plugins' installation and configuration Wiki [page](https://github.com/Labs64/GuideChimp/wiki/Configure#plugins).

### Options
- timeout: time (in milliseconds) after which the waiting for an element will be stopped (default: 5000)
- frequency: indicates how often (in milliseconds) an element availability check will be performed (default: 100)

### How To Use
```javascript
import GuideChimp from 'guidechimp';
import lazyLoading from 'guidechimp/dist/plugins/lazyLoading';


GuideChimp.extend(blurredOverlay, { timeout: 15000, frequency: 500 });
```