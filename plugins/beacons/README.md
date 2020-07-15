## Beacons

This plugin allows you to add *Beacons 🟠 Hotspots 🟠 Hints* to any element on the web page.

### Use Cases

- Interact seamlessly with your web application
- Show user new function in the system and automatically continue to the next tour step after user performed suggested action

### Installation

Please refer to the plugins' installation and configuration Wiki [page](https://github.com/Labs64/GuideChimp/wiki/Configure#plugins).

### How To Use

```html
<!--Beacon definition with onclick(alias: onClick) attribute-->
<div  data-beacon="first_beacon"
      data-beacon-position="top"
      data-beacon-boundary="outer"
      data-beacon-onclick="alert('First beacon click')">
        First beacon
</div>

<!--Beacon definition with tour attribute.
    To display the tour when you click on the beacon, 
    you need to define the name of the tour in the attribute "data-beacon-tour"-->
<div data-beacon="second_beacon"
     data-position="bottom"
     data-beacon-tour="mytour">
       Second beacon
</div>

<div data-guidechimp-tour="mytour"
     data-guidechimp-step="1"
     data-guidechimp-title="Step 1"
     data-guidechimp-description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
</div>

<div data-guidechimp-tour="mytour"
     data-guidechimp-step="2"
     data-guidechimp-title="Step 2"
     data-guidechimp-description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
</div>

<!--Definition multiple beacons on a single element-->
<!--To define options for a particular beacon, use its id in the attribute names, 
attribute name template "data-beacon-{id}-{option}".

In the example below, the “boundary” option will be shared by all definitions of beacons, 
the "position" option is defined for each specific beacon.-->
<div  data-beacon="third_beacon,fourth_beacon"
      data-beacon-boundary="inner"
      data-beacon-third_beacon-position="top"
      data-beacon-fourth_beacon-position="bottom"
      data-beacon-third_beacon-onclick="alert('Third beacon click')"
      data-beacon-fourth_beacon-tour="mytour"
>
        Third & Fourth beacons
</div>

<script>
  const guideChimpBeacons = GuideChimp.beacons();
  guideChimpBeacons.showAll();
</script>
```
**Attention!!! Do not use the “-" symbol in your identifiers**


```javascript
    GuideChimp.extend(guideChimpPluginBeacons);

    const beacons = [
        {
            element: '#try-and-buy',
            position: 'top-left',
            onClick() {
                alert('click');
            }
        },
        {
            element: '#subscription',
            position: 'bottom',
            tour: [{ title: 'Title', description: 'Description' }],
        },
        {
            element: '#pricing-table',
            position: 'middle',
            tour: { steps: [{ title: 'Title', description: 'Description' }], options: { position: 'left' } },
        }
    ];

    const guideChimpBeacons = GuideChimp.beacons(beacons, { boundary: 'outer' });
    guideChimpBeacons.showAll();
```

### Examples

* Beacons plugin example at CodePen - https://codepen.io/netlicensing/full/gOPdjwG
