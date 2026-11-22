<a href="https://www.labs64.com/guidechimp/"><p align="center"><img src="https://io.labs64.com/GuideChimp/docs/img/guidechimp-logo-transparent.png" alt="GuideChimp - Logo"></p></a>

<p align="center">
<a href="https://github.com/Labs64/GuideChimp/actions/workflows/guidechimp-ci.yml"><img src="https://github.com/Labs64/GuideChimp/actions/workflows/guidechimp-ci.yml/badge.svg" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/guidechimp"><img src="https://img.shields.io/npm/v/guidechimp?label=npm&color=CB3837&logo=npm&logoColor=white" alt="GuideChimp @ npm"></a>
<a href="https://www.jsdelivr.com/package/npm/guidechimp"><img src="https://img.shields.io/jsdelivr/npm/hm/guidechimp?label=jsDelivr&color=E84D3D&logo=jsdelivr&logoColor=white" alt="GuideChimp @ jsDelivr"></a>
<a href="https://chrome.google.com/webstore/detail/guidechimp-chrome-extensi/afecedbgkfoijeligfjflidfddndnjng"><img src="https://img.shields.io/badge/chrome-web%20store-4285F4.svg?logo=googlechrome&logoColor=white" alt="GuideChimp @ Chrome Web Store"></a>
<br>
<a href="https://github.com/Labs64/GuideChimp/wiki"><img src="https://img.shields.io/badge/docs-wiki-E14817.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii01IC01IDE1NSAxNTUiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zIDNoMTM5djEzOUgzWk02OSAzdjEzOWg3VjNaTTQzIDQzdjU5aDI2VjQzWk03NiA0M3Y1OWgyNlY0M1oiLz48cGF0aCBmaWxsPSIjYmJiIiBkPSJNNDkgNDloNDd2NDdINDlaIi8%2BPC9zdmc%2B" alt="Documentation"></a>
<a href="https://www.labs64.com/guidechimp/"><img src="https://img.shields.io/badge/website-labs64.com-E14817.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii01IC01IDE1NSAxNTUiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zIDNoMTM5djEzOUgzWk02OSAzdjEzOWg3VjNaTTQzIDQzdjU5aDI2VjQzWk03NiA0M3Y1OWgyNlY0M1oiLz48cGF0aCBmaWxsPSIjYmJiIiBkPSJNNDkgNDloNDd2NDdINDlaIi8%2BPC9zdmc%2B" alt="GuideChimp Website"></a>
<a href="https://github.com/Labs64/GuideChimp/wiki/Plugins"><img src="https://img.shields.io/badge/plugins-12-E14817.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii01IC01IDE1NSAxNTUiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zIDNoMTM5djEzOUgzWk02OSAzdjEzOWg3VjNaTTQzIDQzdjU5aDI2VjQzWk03NiA0M3Y1OWgyNlY0M1oiLz48cGF0aCBmaWxsPSIjYmJiIiBkPSJNNDkgNDloNDd2NDdINDlaIi8%2BPC9zdmc%2B" alt="GuideChimp Plugins"></a>
<a href="https://github.com/Labs64/GuideChimp-tours"><img src="https://img.shields.io/badge/public-tours-E14817.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii01IC01IDE1NSAxNTUiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zIDNoMTM5djEzOUgzWk02OSAzdjEzOWg3VjNaTTQzIDQzdjU5aDI2VjQzWk03NiA0M3Y1OWgyNlY0M1oiLz48cGF0aCBmaWxsPSIjYmJiIiBkPSJNNDkgNDloNDd2NDdINDlaIi8%2BPC9zdmc%2B" alt="GuideChimp Public Tours"></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/license-EUPL--1.2-E14817.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii01IC01IDE1NSAxNTUiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zIDNoMTM5djEzOUgzWk02OSAzdjEzOWg3VjNaTTQzIDQzdjU5aDI2VjQzWk03NiA0M3Y1OWgyNlY0M1oiLz48cGF0aCBmaWxsPSIjYmJiIiBkPSJNNDkgNDloNDd2NDdINDlaIi8%2BPC9zdmc%2B" alt="European Union Public License, version 1.2"></a>
</p>

# GuideChimp

GuideChimp is a JavaScript library for step-by-step product tours. You describe the steps, either as plain objects or as `data-guidechimp-*` attributes in your HTML. GuideChimp then highlights each element in turn and shows a tooltip next to it.

It has no framework dependency, so it works on a plain web page as well as in single page apps built with Angular, Vue, React and similar tools. People use it to onboard new users, introduce new features, add in-product hints and train staff on internal tools.

<p align="center"><img src="https://io.labs64.com/GuideChimp/docs/img/guidechimp-stage-04-shadow.png" alt="GuideChimp - Where To Use"></p>

# Quick start

```javascript
import GuideChimp from 'guidechimp';
import 'guidechimp/dist/guidechimp.min.css';

GuideChimp([
    { element: '#search', title: 'Search', description: 'Find anything from here.' },
    { element: '#profile', title: 'Your profile', description: 'Change your settings here.' },
    { title: 'All set', description: 'A step without an element is just a message.' },
]).start();
```

Prefer HTML? Put the attributes on the elements and start the tour by name:

```html
<button id="search" data-guidechimp-tour="welcome"
        data-guidechimp-title="Search"
        data-guidechimp-description="Find anything from here.">Search</button>
```

```javascript
GuideChimp('welcome').start();
```

# Features

- Steps as JavaScript objects or as HTML data attributes.
- Tooltips position themselves next to the highlighted element.
- Pagination, previous and next buttons, a progress bar, and keyboard control (arrow keys, Enter, Space, Esc).
- Custom action buttons. HTML is allowed in titles and descriptions and is sanitized with DOMPurify before it reaches the page.
- Events and callbacks such as `onBeforeChange` and `onAfterChange`, with several listeners per event. Use them to load data or change the page before a step appears.
- Single page app support: steps can wait for elements that render late or appear after a route change, with the lazy-loading plugin or your own `onBeforeChange` listener.
- Look and feel: style it with the SCSS source or plain CSS. GuideChimp is a JavaScript class, so you can subclass it and change or add methods.
- Internationalization: see the [examples](https://github.com/Labs64/GuideChimp/wiki/Examples).
- Small: about 24 KB gzipped (75 KB minified).
- Extensible with [plugins](#plugins), and it works with tools you already use, such as WordPress and Confluence.
- Dual-licensed: [EUPL-1.2](LICENSE) or [Commercial](https://www.labs64.com/guidechimp/#guidechimp-licensing), which includes support, maintenance and customized implementation.

<p align="center"><img src="https://io.labs64.com/GuideChimp/docs/img/netlicensing-features-tour.gif" alt="Labs64 NetLicensing - Features Tour"></p>

# Plugins

A plugin is a function you pass to `GuideChimp.extend()`:

```javascript
import GuideChimp from 'guidechimp';
import lazyLoading from 'guidechimp/dist/plugins/lazyLoading';

GuideChimp.extend(lazyLoading, { timeout: 2000 });
```

The first four plugins live in this repository and are free under the EUPL-1.2.

| Plugin | What it does |
|---|---|
| [beacons](https://github.com/Labs64/GuideChimp/wiki/Beacons-plugin) | Hotspots and hints that draw attention to any element, and can open a tour when clicked. |
| blurredOverlay | Blurs the page behind the highlighted element. |
| [lazyLoading](https://github.com/Labs64/GuideChimp/wiki/Lazy-loading-plugin) | Waits for a step's element to appear (default timeout 5 seconds) before showing the step. |
| vueRouter | Navigates your Vue Router to a step's `route` before the step is shown. |

Eight more plugins come in the same `guidechimp` package. They check for a valid licence and show a "non-commercial version" notice without one. See [License](#license).

| Plugin | What it does |
|---|---|
| [placeholders](https://github.com/Labs64/GuideChimp/wiki/Placeholders-plugin) | Fills `{*}`-style placeholders in step text with values you set at runtime. |
| templating | Replaces the HTML templates for the tooltip, title, buttons and more. |
| triggers | Runs tour logic when users click, or otherwise interact with, elements you choose. |
| multiPage | Lets one tour span several pages and resumes where the user left off. |
| iFrames | Lets steps target elements inside iframes. |
| googleAnalytics | Sends tour events and timings to Google Analytics. |
| removeAttribution | Removes the GuideChimp attribution from the tooltip. |
| [licensing](https://github.com/Labs64/GuideChimp/wiki/Licensing-plugin) | Validates your licence with Labs64 NetLicensing. |

All plugins are listed on the [plugins wiki page](https://github.com/Labs64/GuideChimp/wiki/Plugins).

# Documentation

The [Wiki](https://github.com/Labs64/GuideChimp/wiki) covers installation, configuration, customization and plugins, with [examples](https://github.com/Labs64/GuideChimp/wiki/Examples) for real-world scenarios.

# Installation

## From a CDN

GuideChimp is on [jsDelivr](https://www.jsdelivr.com/package/npm/guidechimp):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/guidechimp@5.0.5/dist/guidechimp.min.css">
<script src="https://cdn.jsdelivr.net/npm/guidechimp@5.0.5/dist/guidechimp.min.js"></script>
```

Always pin an exact version. For production, also add `integrity` and `crossorigin="anonymous"` to both tags; jsDelivr shows the hash for each file on the package page.

## With npm

GuideChimp is on [npm](https://www.npmjs.com/package/guidechimp):

```bash
npm install guidechimp
```

Then import the library and its CSS as in the quick start above.

## Manually

Download a [release](https://github.com/Labs64/guidechimp/releases) from GitHub, copy the `dist` directory into your project and include the files:

```html
<script src="guidechimp/dist/guidechimp.min.js"></script>
<link rel="stylesheet" href="guidechimp/dist/guidechimp.min.css">
```

We recommend a CDN or npm, because they make it easier to update.

# Demo

To run the interactive demo locally:

```bash
npm run demo
```

More tours to look at:

- [GuideChimp Tour Examples](https://codepen.io/collection/DyPkzY) at CodePen
- [NetLicensing Changelog](https://netlicensing.io/wiki/changelog): notable NetLicensing features
- [NetLicensing Licensing Models](https://netlicensing.io/licensing-models/?guidechimp=on&tour=licensing-models) and [Features](https://netlicensing.io/features/?guidechimp=on&tour=features): sample tours
- [NetLicensing Onboarding](https://ui.netlicensing.io/#/login?cr=ZGVtbzpkZW1v&utm_source=GitHub&utm_medium=website&utm_campaign=GuideChimp_demo&utm_content=demo): user onboarding tour in the NetLicensing UI
- [React Example](https://209hg.csb.app) ([source](https://codesandbox.io/s/guidechimp-react-example-209hg)) at CodeSandbox by [@giubatt](https://github.com/giubatt)

# Development

You need Node.js `^22.23.4`, `^24.22.1` or `>=26.12.1`.

```bash
npm ci
npm run lint
npm test        # Vitest, with a coverage gate
npm run build   # writes dist/
npm run dev     # rebuild on change
```

# Related projects

| Project | What it is | Where to get it |
|---|---|---|
| GuideChimp | The core library (this repository). | [npm](https://www.npmjs.com/package/guidechimp), [jsDelivr](https://www.jsdelivr.com/package/npm/guidechimp) |
| GuideChimp Plugins | Eight extra plugins, built into the `guidechimp` package under `dist/plugins`. | [Plugins wiki](https://github.com/Labs64/GuideChimp/wiki/Plugins) |
| GuideChimp Chrome Extension | Runs public tours on any website without changing it. | [Chrome Web Store](https://chrome.google.com/webstore/detail/guidechimp-chrome-extensi/afecedbgkfoijeligfjflidfddndnjng) |
| GuideChimp Editor | Chrome extension for authoring tours. Early stage. | In development |
| GuideChimp Public Tours | Community-maintained tours for popular websites. | [GitHub](https://github.com/Labs64/GuideChimp-tours) |

# Contributing

Everyone is welcome. Send pull requests, bug reports or ideas; see [CONTRIBUTING.md](CONTRIBUTING.md).

GuideChimp is maintained by Labs64. [Contact](https://www.labs64.com/contact/) us for web app consulting, development and training, or to book a demo.

# Bugs and feedback

For bugs, questions and discussions, please use [GitHub Issues](https://github.com/Labs64/guidechimp/issues).

# License

GuideChimp is available under the [European Union Public License, version 1.2](LICENSE) or a [Commercial License](https://www.labs64.com/guidechimp/#guidechimp-licensing). The Commercial License requires a fee for each designated commercial application.

- With the EUPL-1.2, you must release the source code of any program you distribute that uses GuideChimp.
- With a Commercial License, you don't have to disclose your source code.

Commercial GuideChimp plugins need a [valid customer account](https://www.labs64.com/guidechimp/#guidechimp-licensing) with the assigned plan and [additional configuration](https://github.com/Labs64/GuideChimp/wiki/Licensing-plugin). It is used to check which functions or plugins your account may use.

# Privacy policy

The applicable data protection provisions are in the [Privacy Policy](privacy-policy.md).

# Star history

[![Star History Chart](https://api.star-history.com/svg?repos=Labs64/GuideChimp&type=Date)](https://www.star-history.com/#Labs64/GuideChimp&Date)
