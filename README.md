<a href="https://www.labs64.com/guidechimp/"><p align="center"><img src="https://io.labs64.com/GuideChimp/docs/img/guidechimp-logo-transparent.png" alt="GuideChimp - Logo"></p></a>

<p align="center">
<a href="https://github.com/Labs64/GuideChimp/actions?query=workflow%3A%22GuideChimp+CI%22"><img src="https://github.com/Labs64/GuideChimp/workflows/GuideChimp%20CI/badge.svg" alt="Build Status"></a>
<a href="https://badge.fury.io/js/guidechimp"><img src="https://badge.fury.io/js/guidechimp.svg" alt="GuideChimp @ npmjs"></a>
<a href="https://www.jsdelivr.com/package/npm/guidechimp"><img src="https://data.jsdelivr.com/v1/package/npm/guidechimp/badge" alt="GuideChimp @ jsDelivr"></a>
<a href="https://github.com/Labs64/GuideChimp/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-EUPL--1.2-blue.svg" alt="European Union Public License, version 1.2"></a>
<br>
<a href="https://github.com/Labs64/GuideChimp/wiki/Plugins"><img src="https://img.shields.io/badge/Plugins-12-AB6543.svg" alt="GuideChimp Plugins"></a>
<a href="https://github.com/Labs64/GuideChimp/wiki"><img src="https://img.shields.io/badge/📖%20Documentation-Wiki-AB6543.svg" alt="📖 Documentation"></a>
<a href="https://chrome.google.com/webstore/detail/guidechimp-chrome-extensi/afecedbgkfoijeligfjflidfddndnjng"><img src="https://img.shields.io/badge/🌐%20Chrome%20Extension-FFCD46.svg" alt="GuideChimp @ Chrome Extension"></a>
<a href="https://www.labs64.com/guidechimp/"><img src="https://img.shields.io/badge/🌐%20GuideChimp-Website-AB6543.svg" alt="🌐 GuideChimp Website"></a>
<a href="https://www.linkedin.com/showcase/guidechimp"><img src="https://img.shields.io/badge/GuideChimp-0077B5.svg?logo=LinkedIn" alt="GuideChimp @ LinkedIn"></a>
</p>


Deliver the perfect product experience, improve digital product adoption, boost adoption of new features and simplify user onboarding with step by step interactive walkthroughs.

# What can you do with GuideChimp?

<a href="https://www.labs64.com/guidechimp/"><p align="center"><img src="https://io.labs64.com/GuideChimp/docs/img/guidechimp-stage-04-shadow.png"  alt="GuideChimp - Where To Use"></p></a>

- <strong>User Experience:</strong> Implement engaging and personalised guides to walk users through your system.
- <strong>User Onboarding:</strong> Successfully onboard your users from day one with an intuitive step by step walkthroughs.
- <strong>Feature Adoption:</strong> Introduce and highlight new features with personalized guides.
- <strong>In-product Messaging:</strong> Engage the right segment of your users at the right time and increase conversion.
- <strong>Employee Training:</strong> Improve your employees' productivity by providing an efficient and interactive training system.

The world's smartest companies using our GuideChimp to boost their user experience.

# Features

- Seamless integration with any web app.
- Start guided tour on any website with [GuideChimp Chrome Extension](https://chrome.google.com/webstore/detail/guidechimp-chrome-extensi/afecedbgkfoijeligfjflidfddndnjng) and... ZERO! code.
- GuideChimp is simple and robust enough to provide results with minimal effort! Set up it in just 3 minutes!
- Let GuideChimp look like an integral part of your software product by configuring its look & feel
- GuideChimp works well with tools you already use (e.g. WordPress, Confluence, etc.).
- [Beacons](https://github.com/Labs64/GuideChimp/wiki/Beacons-plugin) 🟠 Hotspots 🟠 Hints: Raise visitors attention by adding an additional description to any element on the web page.
- Tours: Flows, Walkthroughs, Guides, Tutorials
- Support of *Single Page Applications* build with Angular, Vue.js, React, etc.
- Extendable using out-of-the-box and third-party [plugins](https://github.com/Labs64/GuideChimp/wiki/Plugins)
- Dynamic [placeholders](https://github.com/Labs64/GuideChimp/wiki/Placeholders-plugin) in the tour definition
- Detailed installation and configuration [documentation](https://github.com/Labs64/GuideChimp/wiki)
- Tooltip auto-positioning on an element
- Easy styling through SCSS and clean CSS
- Tour steps can be defined in two ways: HTML elements data attributes and JavaScript object properties
- Library installation possible through HTML and es6 import
- Use multiple listeners on tour events
- Internationalization / i18n [support](https://github.com/Labs64/GuideChimp/wiki/Examples)
- Ability to add steps on-the-fly / programmatically
- Enable tour on the lazy-loaded or delayed elements (post-rendering, route changing, etc.) in single-page applications using "onBeforeChange" event or [Lazy-loading plugin](https://github.com/Labs64/GuideChimp/wiki/Lazy-loading-plugin)
- Ability to define custom action buttons
- Flexibility and modularity; GuideChimp is designed as a JS class, so you can easily inherit from it and change / add custom methods
- Improved usability - pagination, navigation and progress bar
- HTML code can be also used in the tooltip text
- Support of extra-large tooltip description texts
- Ability to set callback ("onBeforeChange", "onAfterChange") functions for each step in the tour
- Lightweight (*< 45KB*) and good performance
- **Last But Not Least:** :point_up: Dual-Licensed - [EUPL-1.2](LICENSE) and [Commercial](https://www.labs64.com/guidechimp/#guidechimp-licensing) (including great support, maintenance and customized implementation)

<p align="center"><img src="https://io.labs64.com/GuideChimp/docs/img/netlicensing-features-tour.gif"  alt="Labs64 NetLicensing - Features Tour"></p>


# 📖 Documentation

Visit GuideChimp [Wiki](https://github.com/Labs64/GuideChimp/wiki) for installation and configuration tips, customizations and plugins, as well as [examples](https://github.com/Labs64/GuideChimp/wiki/Examples) on how to use GuideChimp in the real-world scenarios.


# How to Use

In order to use GuideChimp, you must include the compiled and minified JavaScript file in your project. There are multiple options for including these pre-compiled files, also known as a distribution, in your website or application.


## 1) Using from a CDN

- jsDelivr - https://www.jsdelivr.com/package/npm/guidechimp


## 2) Install as Node.js/npm Module

GuideChimp is available on [npmjs](https://www.npmjs.com/package/guidechimp). Add the following to your `package.json` file and then run `npm install`:
```json
"dependencies": {
    "guidechimp": "x.y.z"
}
```

or execute following command in your Node.js environment:

```bash
$ npm install guidechimp
```

## 3) Install as ES6 Module

If you are using ES6 modules, import the library and CSS file:

```javascript
import GuideChimp from 'guidechimp';
import 'guidechimp/dist/guidechimp.min.css';
```

## 4) Manual Installation

We strongly recommend that you use either a CDN or a package manager like npm. This will make it easier for you to deploy your project in different environments, and easily update GuideChimp when new versions are released. Nonetheless, if you prefer to integrate GuideChimp into your project manually, you can [download the release of your choice](https://github.com/Labs64/guidechimp/releases) from GitHub and copy the files from the `dist` directory into your project.

Include the compiled files in your HTML page:
```html
<script src="guidechimp/dist/guidechimp.min.js"></script>
<link rel="stylesheet" href="guidechimp/dist/guidechimp.min.css">
```


# Demo

See GuideChimp in action in the product walkthrough, showcases and real-world examples below:

- [GuideChimp Tour Examples](https://codepen.io/collection/DyPkzY) at CodePen
- [NetLicensing Changelog](https://netlicensing.io/wiki/changelog) - Tour: Notable NetLicensing Features
- [NetLicensing Licensing Models](https://netlicensing.io/licensing-models/?guidechimp=on&tour=licensing-models) - Sample Tour: Licensing Models
- [NetLicensing Features](https://netlicensing.io/features/?guidechimp=on&tour=features) - Sample Tour: NetLicensing Features
- [NetLicensing Onboarding](https://ui.netlicensing.io/#/login?cr=ZGVtbzpkZW1v&utm_source=GitHub&utm_medium=website&utm_campaign=GuideChimp_demo&utm_content=demo) - NetLicensing UI: User Onboarding Tour
- [React Example](https://209hg.csb.app) ([source](https://codesandbox.io/s/guidechimp-react-example-209hg)) at CodeSandbox by [@giubatt](https://github.com/giubatt)


# How to Contribute

Everyone is welcome to contribute to this project!
Feel free to [contribute](CONTRIBUTING.md) with pull requests, bug reports or enhancement suggestions.

---

GuideChimp is maintained by Labs64.
[Contact](https://www.labs64.com/contact/) us for web app consulting, development, and training for your project or book a demo.

---

<a href="https://www.producthunt.com/posts/guidechimp?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-guidechimp" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=182973&theme=light" alt="GuideChimp - Simplify user onboarding with interactive walkthroughs | Product Hunt Embed" style="width: 250px; height: 54px;" width="250px" height="54px" /></a>


# Bugs and Feedback

For bugs, questions and discussions please use the [GitHub Issues](https://github.com/Labs64/guidechimp/issues).


# License

GuideChimp is made available under the [European Union Public License, version 1.2](LICENSE) or [Commercial License](https://www.labs64.com/guidechimp/#guidechimp-licensing).
The Commercial License requires the payment of a fee for each designated commercial application.
- If you choose not to pay a fee and use the *European Union Public License, version 1.2*, you are required to release the source code of any program that you distribute that uses GuideChimp.
- If you choose to pay for a *Commercial License*, you are not required to disclose your source code.

Commercial GuideChimp plugins require a [valid customer account](https://www.labs64.com/guidechimp/#guidechimp-licensing) with the assigned plan and [additional configuration](https://github.com/Labs64/GuideChimp/wiki/Licensing-plugin), which will be used to validate the availability of particular GuideChimp functions or plugins for the given customer account.

# Privacy Policy

The applicable data protection provisions may be retrieved under [Privacy Policy](privacy-policy.md).
