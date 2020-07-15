## Triggers

This plugin allows you to trigger GuideChimp events such as `"next"`, `"previous"`, `"stop"` or your custom events upon HTML DOM elements events.

You can set up triggers globally and for each step individually.

### Use Cases

- Interact seamlessly with your web application
- Show user new function in the system and automatically continue to the next tour step after user performed suggested action

### Installation

Please refer to the plugins' installation and configuration Wiki [page](https://github.com/Labs64/GuideChimp/wiki/Configure#plugins).

### How To Use

```html
<div class="next">Next</div>
<div class="previous">Previous</div>
<div class="stop">Stop</div>

<div id="step1">First step</div>
<div id="step2">First step</div>
<div id="step3">Third step</div>
<div><button id="startTour" class="start-tour">Start Tour</button></div>
<script>
GuideChimp.extend(guideChimpPluginTriggers);

     var tour = [
        {
            element: '#step1',
            title: 'Step 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            // step triggers
            triggers: {
                next: '#step1',
            },       
        },
        {
            element: '#step2',
            title: 'Step 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
             // step triggers
             triggers: {
                 next: '#step2',
             },  
        },
        {
            element: '#step3',
            title: 'Step 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            // step triggers
            triggers: {
                 stop: '#step3',
            },  
        },
    ];

    var guide = GuideChimp(tour, {
        // global triggers
        triggers: {
            next: '.next',
            previous: '.previous',
            stop: '.stop',
        },   
    });

    document.getElementById('startTour').onclick = () => {
        guide.start();
    }
</script>
```

Trigger can be one of: CSS-selector, HTMLElement, NodeList or object. Moreover, you can define a single trigger or array of triggers.

```javascript
const previousHTMLElement = document.querySelector('.previous');
const stopNodeList = document.querySelector('.stop');

var guide = GuideChimp(tour, {
        // global triggers
        triggers: {
            next: '.next',
            previous: previousHTMLElement,
            stop: ['.close', stopNodeList],
        },   
    });
```

By default string(selector), HTMLElement and NodeList triggers use "click" event.
Use the trigger object to change an event or event listener function.

```javascript
var guide = GuideChimp(tour, {
        // global triggers
        triggers: {
            next: {
                element: '.next',    // mandatory property
                event: 'dblclick',   // optional, by default "click"
                listener(e) {        // optional, use if you want to change the standard trigger behavior
                    var el = e.target;                    

                    if (el.dataset.step) {
                       this.go(el.dataset.step);
                    } else {
                      this.next();
                    }    
                },       
            },
        },   
    });
```

### Examples

* Triggers plugin example at CodePen - https://codepen.io/netlicensing/full/PoPawdv
