## Google Analytics

Track tour events with Google Analytics.


### How To Use

Method `gaOn(event, action, parameters = {})`: _Subscribe and send the gtag event on the GuideChimp event_
   * `event`: GuideChimp event
   * `action`: is the string that will appear as the event action in Google Analytics Event reports
   * `parameters`(optional): Google Analytics parameter object or function with returned parameter object
   
```javascript
   // global events
   GuideChimp.gaOn('onBeforeChange', 'Global Event', { event_category: 'Event Category' });

   var guideChimp = GuideChimp(tour, options);
    
   // specific guide events
   guideChimp.gaOn('onBeforeChange', 'Tour Event', (to, from) => {
       return {
           event_category: 'Category ' + to.title,
           event_label: 'Step ' + to.step,
       };
   });
```

Method `gaTiming(startEvent, endEvent, parameters = {})`: _Sends the amount of time elapsed from the start event to the end event at the time the end event was emitted._
   * `startEvent`: GuideChimp event
   * `endEvent`: GuideChimp event
   * `parameters`(optional): Google Analytics parameter object or function with returned parameter object
   
   ```javascript
      // global timing
      GuideChimp.gaTiming('onStart', 'onStop', { event_category: 'Tour' });
   
      var guideChimp = GuideChimp(tour, options);
       
      // specific guide timing
      guideChimp.gaTiming('onBeforeChange', 'onAfterChange', (toBefore, fromBefore, toAfter, fromAfter) => {
          return {
              event_category: 'Category ' + toBefore.title,
              event_label: 'Step ' + toBefore.step,
          };
      });
   ```
Method `gaEvent(action, parameters = {})`: _Sends gtag event._
   * `action`: is the string that will appear as the event action in Google Analytics Event reports
   * `parameters`: Google Analytics parameter object
   
```javascript
     var guideChimp = GuideChimp([{
            title: 'Step 1',
            description: 'It is step 1',
            buttons: [
                {
                    title: 'Ok',
                    onClick() {
                        guideChimp.gaEvent('OK button was pressed', { event_category: 'Buttons' })
                    }
                }
            ]
        }]);
 ```
