These are tour definitions for the public websites.

## How To

### Open website
e.g. https://about.gitlab.com

### Open browser's console
- Firefox: `Tools > `Web Developer` > `Web Console`
- Chrome:  `More Tools` > `Developer Tools`
- Safari:  `Develop` > S`how JavaScript Console`

### Load GuideChimp scripts and styles
```javascript
fetch('https://io.labs64.com/GuideChimp/docs/samples/bootstrap-browser-console.js')
    .then(response => response.text())
    .then(text => eval(text));
```

### Prepare website tour
```javascript
fetch('https://io.labs64.com/GuideChimp/docs/tours/about.gitlab.com.js')
    .then(response => response.text())
    .then(text => eval(text));
```

### Run tour
```javascript
GuideChimp(tour).start();
```
