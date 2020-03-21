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

### Prepare website tour

Open tour definition from this path `https://io.labs64.com/GuideChimp/docs/tours/<WEBSITE>.js` (replace *<WEBSITE>*) and execute this in the browser console.

#### Sample

**Tour definition:** https://io.labs64.com/GuideChimp/docs/tours/about.gitlab.com.js

```javascript
var tour = [
    {
        element: 'div.col-md-4.challenge-box.complexity.js-all-clickable',
        title: 'Complexity',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        position: 'right',
    },
    {
        element: 'div.col-md-4.challenge-box.speed.js-all-clickable',
        title: 'Speed',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        position: 'top',
    },
    {
        element: 'div.col-md-4.challenge-box.security.js-all-clickable',
        title: 'Security',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        position: 'left',
    },
];
```

### Run tour
```javascript
GuideChimp(tour).start();
```
