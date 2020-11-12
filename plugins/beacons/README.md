## Beacons

<img src="https://github.com/Labs64/GuideChimp/blob/master/plugins/beacons/guidechimp-beacons.gif" alt="GuideChimp Beacons"/>

This plugin allows you to add *Beacons 🟠 Hotspots 🟠 Hints* to any element on the web page.

### Use Cases

- Interact seamlessly with your web application
- Show user new function in the system and automatically continue to the next tour step after user performed suggested action

### Installation

Please refer to the plugins' installation and configuration Wiki [page](https://github.com/Labs64/GuideChimp/wiki/Configure#plugins).

### Options

Following options can be used to configure beacons via JavaScript:

* `element`: Query selector string or HTML element; if not defined, the tooltip will be centred on the screen. [Verify selector](https://gist.github.com/r-brown/e0d4fde1e14e792b4ec155b0f6f06e7a)
* `position`: Beacon position (values: top-left, top, top-right, center-left, center, center-right, bottom-left, bottom, bottom-right)
* `boundary`: Beacon container position (values: outer, inner)
* `tour`: tour reference or definition to be started on beacon click
* `class`: CSS class to be assigned to the beacon
* `onClick()`: Listener function called on the beacon click

### How To Use

```html
<!-- Beacon definition with onclick(alias: onClick) attribute -->
<div data-beacon="first_beacon"
     data-beacon-position="top"
     data-beacon-boundary="outer"
     data-beacon-onclick="alert('First beacon clicked')">
       First beacon
</div>

<!-- Beacon definition with tour attribute.
     Display the GuideChimp tour by click on the beacon.
     Define the name of the tour in the attribute "data-beacon-tour" -->
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

<!-- Multiple beacons on a single element -->
<!-- Define options for a particular beacon, use beacon's ids in the attribute names.
     Attribute name template "data-beacon-{id}-{option}".

     In the below example, the “boundary” option will be shared by all definitions of beacons
     The "position" option is defined for each specific beacon. -->
<div data-beacon="third_beacon,fourth_beacon"
     data-beacon-boundary="inner"
     data-beacon-third_beacon-position="top"
     data-beacon-fourth_beacon-position="bottom"
     data-beacon-third_beacon-onclick="alert('Third beacon clicked')"
     data-beacon-fourth_beacon-tour="mytour">
       Third & Fourth beacons
</div>

<script>
  const guideChimpBeacons = GuideChimp.beacons();
  guideChimpBeacons.showAll();
</script>
```
**Warning! Do not use the “-" symbol in the beacons identifiers**

```javascript
GuideChimp.extend(guideChimpPluginBeacons);

const beacons = [
    {
        element: '#try-and-buy',
        position: 'top-left',
        onClick() {
            alert('Beacon clicked');
        }
    },
    {
        element: '#subscription',
        position: 'bottom',
        tour: [{ title: 'Title', description: 'Description' }],
    },
    {
        element: '#pricing-table',
        position: 'center',
        tour: { steps: [{ title: 'Title', description: 'Description' }], options: { position: 'left' } },
    }
];

const guideChimpBeacons = GuideChimp.beacons(beacons, { boundary: 'outer' });
guideChimpBeacons.showAll();
```

### Examples

* Beacons plugin example at CodePen - https://codepen.io/netlicensing/full/gOPdjwG
