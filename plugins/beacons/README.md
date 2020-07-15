## Beacons

This plugin allows you to add *Beacons 🟠 Hotspots 🟠 Hints* to any element on the web page.

### Use Cases

- Interact seamlessly with your web application
- Show user new function in the system and automatically continue to the next tour step after user performed suggested action

### Installation

Please refer to the plugins' installation and configuration Wiki [page](https://github.com/Labs64/GuideChimp/wiki/Configure#plugins).

### How To Use

```html

```

```javascript
<script>
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
            tour: 'first',
        },
        {
            element: '#pricing-table',
            position: 'middle',
            tour: { steps: [{ title: 'Title', description: 'Description' }], options: { position: 'left' } },
        }
    ];


    (GuideChimp.beacons(beacons, { boundary: 'outer' })).showAll();
</script>
```

### Examples

* Beacons plugin example at CodePen - https://codepen.io/netlicensing/full/gOPdjwG
