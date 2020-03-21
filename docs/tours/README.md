You can try GuideChimp on any public website by executing below commands in the browser console.

## How To

### Open website
e.g. https://about.gitlab.com

### Open browser console
- **Firefox:** `Tools` > `Web Developer` > `Web Console`
- **Chrome:**  `More Tools` > `Developer Tools`
- **Safari:**  `Develop` > `Show JavaScript Console`

### Load GuideChimp scripts and styles
```javascript
fetch('https://io.labs64.com/GuideChimp/docs/samples/bootstrap-browser-console.js')
    .then(response => response.text())
    .then(text => eval(text));
```

### Run tour
```javascript
fetch('https://io.labs64.com/GuideChimp/docs/tours/<WEBSITE>.js')
    .then(response => response.text())
    .then(text => eval(text));
```
replace `<WEBSITE>` with the website domain name.

#### Sample
```javascript
fetch('https://io.labs64.com/GuideChimp/docs/tours/about.gitlab.com.js')
    .then(response => response.text())
    .then(text => eval(text));
```
