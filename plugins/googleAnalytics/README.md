## Google Analytics

Track tour events with Google Analytics.


### How To Use

#### Subscribe and send the Google Analytics events for the GuideChimp tour events

Method: `gaOn(event, action, parameters = {})`

* `event`: GuideChimp event
* `action`: Google Analytics event action
* `parameters`(optional): Google Analytics parameters object
   
```javascript
   // global events
   GuideChimp.gaOn('onBeforeChange', 'Global Event', { event_category: 'Event Category' });

   var guideChimp = GuideChimp(tour, options);
    
   // specific tour events
   guideChimp.gaOn('onBeforeChange', 'Tour Event', (to, from) => {
       return {
           event_category: 'Category ' + to.title,
           event_label: 'Step ' + to.step,
       };
   });
```

#### Track elapsed time between GuideChimp events

Method: `gaTiming(startEvent, endEvent, parameters = {})`

* `startEvent`: GuideChimp start event
* `endEvent`: GuideChimp end event
* `parameters`(optional): Google Analytics parameters object
   
 ```javascript
   // global timing
   GuideChimp.gaTiming('onStart', 'onStop', { event_category: 'Tour' });
   
   var guideChimp = GuideChimp(tour, options);
       
   // specific tour timing
   guideChimp.gaTiming('onBeforeChange', 'onAfterChange', (toBefore, fromBefore, toAfter, fromAfter) => {
       return {
           event_category: 'Category ' + toBefore.title,
           event_label: 'Step ' + toBefore.step,
       };
   });
```

#### Send Google Analaytics event

Method: `gaEvent(action, parameters = {})`

* `action`: Google Analytics event action
* `parameters`(optional): Google Analytics parameters object
   
```javascript
  var guideChimp = GuideChimp([{
      title: 'Step 1',
      description: 'Step 1 description',
      buttons: [
          {
              title: 'OK',
              onClick() {
                  guideChimp.gaEvent('OK button pressed', { event_category: 'Button' })
              }
          }
      ]
  }]);
 ```
