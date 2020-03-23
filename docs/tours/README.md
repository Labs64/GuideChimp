You can try GuideChimp on any public website by executing below commands in the browser console.

## How to test GuideChimp on your webapp

### 1) Open website

e.g. https://netlicensing.io

### 2) Open browser console
- **Firefox:** `Tools` > `Web Developer` > `Web Console`
- **Chrome:**  `More Tools` > `Developer Tools`
- **Safari:**  `Develop` > `Show JavaScript Console`

### 3) Load GuideChimp scripts and styles

```javascript
fetch('https://io.labs64.com/GuideChimp/docs/samples/bootstrap-browser-console.js')
    .then(response => response.text())
    .then(text => eval(text));
```

### 4) (optional) Load GuideChimp built-in plugins

Some of the websites tours might use GuideChimp [plugins](https://github.com/Labs64/GuideChimp/wiki/Plugins).
In this case, you need to load these using below command:

```javascript
fetch('https://io.labs64.com/GuideChimp/docs/samples/bootstrap-plugins.js')
    .then(response => response.text())
    .then(text => eval(text));
```

### 5) Run tour

```javascript
fetch('https://io.labs64.com/GuideChimp/docs/tours/<WEBSITE>.js')
    .then(response => response.text())
    .then(text => eval(text));
```
replace `<WEBSITE>` with the website domain name.

#### Sample
```javascript
fetch('https://io.labs64.com/GuideChimp/docs/tours/netlicensing.io.js')
    .then(response => response.text())
    .then(text => eval(text));
```
