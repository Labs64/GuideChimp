## Blurred Overlay

### Use Cases

- Add blurred background effect to the tour overlay 

### Installation

Please refer to the plugins' installation and configuration Wiki [page](https://github.com/Labs64/GuideChimp/wiki/Configure#plugins).

### How To Use

**CDN:**
```html
<script src="https://cdn.jsdelivr.net/npm/guidechimp/dist/guidechimp.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/guidechimp/dist/guidechimp.min.css">

<script src="https://cdn.jsdelivr.net/npm/guidechimp/dist/plugins/blurredOverlay.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/guidechimp/dist/plugins/blurredOverlay.min.css">

<script>
    GuideChimp.extend(guideChimpPluginBlurredOverlay);
</script>
```

**ES6:**
```javascript
import GuideChimp from 'guidechimp';

import blurredOverlay from 'guidechimp/dist/plugins/blurredOverlay';
import 'guidechimp/dist/plugins/blurredOverlay.min.css';

GuideChimp.extend(blurredOverlay);
```

### How to change blur effect strength

To change the strength of the blur effect, modify value at `filter: blur(...)`

**Example:**
```css
body.gc * {
    filter: blur(1.5em);
}
```

### Examples

- Blurred Overlay - https://codepen.io/netlicensing/full/pobRyEO
