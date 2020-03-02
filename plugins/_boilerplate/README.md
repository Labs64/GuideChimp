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
