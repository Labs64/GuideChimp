You can contribute to the GuideChimp ecosystem and create your own plugins and extend GuideChimp functionality.

## How To Start

- Fork GuideChimp repository
- Copy the plugins/_boilerplate/ folder and rename this (Notation: pluginName)
- Extend GuideChimp functionality
- Do not forget to test your plugin
- Provide installation and usage instructions in the plugin's README.md file
- Create [Pull Request](https://github.com/Labs64/GuideChimp/pull/new/master)

We'll verify your submission and accept Pull Request if this will satisfy our quality requirements.

## Plugin Template

```javascript
/**
 *
 * @param {Class} cls GuideChimp class
 * @param {Object} factory GuideChimp factory
 * @param {Array} args optional arguments needed for the plugin; for instance, the options object
 */
module.exports = (cls, factory, ...args) => {

    /**
     * extend GuideChimp() class
     * e.g. add GuideChimp(tour).customMethod()
     */
    cls.prototype.customMethod = () => {};
    
    /**
     * extend GuideChimp factory
     * e.g. add GuideChimp.customMethod()
     */
    factory.customMethod = () => {};

 
     // override existing API
     // e.g. extend GuideChimp().init()
     const parentInit = cls.prototype.init;
     cls.prototype.init = () => {
         parentInit();
 
         // custom code
         //...
     };

    // Override static method
    const parentDefaultOptions = cls.prototype.getDefaultOptions;
       cls.getDefaultOptions = () => ({
           ...parentDefaultOptions(),
           // custom options
           // ...
       });
 };
```
