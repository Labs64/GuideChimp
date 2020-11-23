## MultiPage

This plugin allows guided tour usage across multiple pages.

MultiPage plugin adds a new `.continue()` method, which automatically starts the tour in case it needs to be continued.

### Use Cases

- Change to the new page on the next/prev tour steps
- Automatically continue tour on the next page

### Installation

Please refer to the plugins' installation and configuration Wiki [page](https://github.com/Labs64/GuideChimp/wiki/Configure#plugins).

### How To Use

**first-page.html**

```html

<div id="step1">First step</div>
<div id="step3">Third step</div>
<div>
    <button id="startTour" class="start-tour">Start Tour</button>
</div>
<script>
    GuideChimp.extend(guideChimpPluginMultiPage);

    var tour = [
        {
            element: '#step1',
            title: 'Step 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            multiPage: {
                page: 'first-page.html',
            },
        },
        {
            element: '#step2',
            title: 'Step 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            multiPage: {
                page: 'second-page.html',
            },
        },
        {
            element: '#step3',
            title: 'Step 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            multiPage: {
                page: 'first-page.html',
            },
        },
    ];

    var guide = GuideChimp(tour);

    // detects whether the tour should be continued and automatically continues the tour on the right step
    guide.continue();

    document.getElementById('startTour').onclick = () => {
        guide.start();
    }
</script>
```

**second-page.html**

```html

<div id="step2">Second step</div>

<script>
    GuideChimp.extend(guideChimpPluginMultiPage);

    var tour = [
        {
            element: '#step1',
            title: 'Step 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            multiPage: {
                page: 'first-page.html',
            },
        },
        {
            element: '#step2',
            title: 'Step 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            multiPage: {
                page: 'second-page.html',
            },
        },
        {
            element: '#step3',
            title: 'Step 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            multiPage: {
                page: 'first-page.html',
            },
        },
    ];

    var guide = GuideChimp(tour);

    // detects whether the tour should be continued and automatically continues the tour on the right step
    guide.continue();
</script>
```

**first-page.html**

#### Page as function

You can use the "page" property as a function, this is useful if the page url is not known when the tour is initialized,
and you need to execute some code to get the url.

```javascript
var tour = [
    {
        element: '#step1',
        title: 'Step 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        multiPage: {
            page() {
                var link = document.querySelector('a.step1');
                return link.href;
            },
        },
    },
    {
        element: '#step2',
        title: 'Step 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        multiPage: {
            page() {
                // Wait for promises
                return fetch('http://example.com/get-step2-url')
                    .then((response) => {
                        return response.text(); // return url string
                    })
            },
        },
    },
];

var guide = GuideChimp(tour);
```
