## Plugin tips
```javascript
/**
 *
 * @param {Class} cls GuideChimp class
 * @param {Object} factory GuideChimp factory
 * @param {Array} args any arguments for the needs of your plugin, for example: options object
 */
module.exports = (cls, factory, ...args) => {
    /**
     * extend GuideChimp() class
     * e.g. add GuideChimp(tour).someMyMethod()
     */
    cls.prototype.someMyMethod = () => {};
    
    /**
     * extend GuideChimp factory
     * e.g. add GuideChimp.someMyMethod()
     */
    factory.someMyMethod = () => {};

 
     // overriding existing API
     // e.g. extend GuideChimp().init()
     const parentInit = cls.prototype.init;
     cls.prototype.init = () => {
         parentInit();
 
         // some my extra code
         //...
     };

    // Override static method
    const parentDefaultOptions = cls.prototype.getDefaultOptions;
       cls.getDefaultOptions = () => ({
           ...parentDefaultOptions(),
           // my default options
           // ...
       });
 };
```