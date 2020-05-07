
## Triggers

This plugin allows you to specify an HTML element(s) as a trigger for such GuideChimp events as "next", "previous", "stop".

The trigger plugin allows you to set triggers both global and for each step individually

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

Trigger can be string(selector), HTMLElement, NodeList or object.
Moreover you could use single trigger or array of triggers.

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

By default string(selector), HtmlElement of NodeList triggers use event "click".
If you need to change an event or even a listener function, you can use the trigger object

```javascript
var guide = GuideChimp(tour, {
         // global triggers
        triggers: {
            next: {
                element: '.next', // it is mandatory property
                event: 'dblclick', // optional, by default "click"
                listener(e) { // optional, use if you want to change the standard trigger behavior
                    var el = e.target;                    
                    
                    if(el.dataset.step){
                       this.go(el.dataset.step);
                    } else {
                      this.next();
                    }    
                },       
            },
        },   
    });
```
