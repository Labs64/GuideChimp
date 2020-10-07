## VueRouter

This plugin allows you to use "vue-router" to display the tour on different [Vue.js](https://vuejs.org) routes.

### Use Cases

- Enable guided tours fo your Vue.js applications
- Navigate to the defined route on the next/prev tour steps
- Automatically continue tour on the next route / page / view

### Installation

Please refer to the plugins' installation and configuration Wiki [page](https://github.com/Labs64/GuideChimp/wiki/Configure#plugins).

### How To Use

**main.js**

```javascript
import Vue from 'vue';
import GuideChimp from 'guidechimp';
import vueRouterPlugin from 'guidechimp/dist/plugins/vueRouter';
import router from './router';

GuideChimp.extend(vueRouterPlugin, router);

Vue.use({
    install(V) {
        V.prototype.$guideChimp = GuideChimp;
    },
});

```

**FirstPage.vue**

```html
<template>
    <div>
        <div id="step1">First step</div>
        <div id="step3">Third step</div>
        <div><button id="startTour" class="start-tour">Start Tour</button></div>
    </div>
</template>

<script>
    export default {
        name: 'FirstPage',
        mounted() {
            const tour = [
                  {
                      element: '#step1',
                      title: 'Step 1',
                      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                      route: '/first-page',
                  },
                  {
                      element: '#step2',
                      title: 'Step 2',
                      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                      route: '/second-page',
                  },
                  {
                      element: '#step3',
                      title: 'Step 3',
                      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                      route: '/first-page',
                  },
             ];

            const guide = this.$guideChimp(tour);

            document.getElementById('startTour').onclick = () => {
                guide.start();
            };
        },
    };
</script>
```

**SecondPage.vue**

```html
<template>
    <div>
        <div id="step2">Second step</div>
    </div>
</template>

<script>
    export default {
            name: 'SecondPage',
        };
</script>
```
