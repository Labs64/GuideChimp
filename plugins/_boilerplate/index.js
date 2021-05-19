/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the European Union Public License, version 1.2
 * located in the LICENSE file
 */

/**
 *
 * @param {Class} cls GuideChimp class
 * @param {Object} factory GuideChimp factory
 * @param {Array} args optional arguments needed for the plugin; for instance, the options object
 */
module.exports =  (cls, factory, ...args) => {
    /**
     * Plugin dependency management.
     * In case your plugin depends on another plugin, you can use plugin dependency system.
     * To check, if the required plugin is enabled, use the "factory.plugins" property, which is an object of the "Set"
     * class and contains all enabled plugins (functions).
     * @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Set
     */
    const triggersPlugin = import('../triggers');
    if (!factory.plugins.has(triggersPlugin)) {
        console.warn('Plugin cannot be enabled, please enable triggers plugin first');
        return;
    }

    /**
     * INITIALIZATION & OPTIONS
     * ________________________
     */

    /**
     * Add setup logic without having to override the constructor.
     */
    const parentInit = cls.prototype.init;
    cls.prototype.init = function () {
        parentInit.call(this);

        /**
         * Custom event listener
         * @param {Object} to step to go to
         * @param {Object} from step to go from
         */
        this.on('onBeforeChange', (to, from) => {
            // custom code
            // ...
        });

        /**
         * Trigger custom event
         */
        this.emit('CustomEvent', ...args);

        // custom code
        // ...
    };

    /**
     * Add/change default options
     * Override static method
     */
    const parentDefaultOptions = cls.prototype.getDefaultOptions;
    cls.getDefaultOptions = () => ({
        ...parentDefaultOptions(),
        // custom default options
        // ...
    });

    /**
     * CSS CLASS MANIPULATION
     * ________________________
     */

    /**
     * The getBodyClass method returns classes that will be added to the body, when GuideChimp starts
     */
    const parentGetBodyClass = cls.getBodyClass;
    cls.getBodyClass = () => `${parentGetBodyClass()} custom-class`;

    /**
     * The getLoadingClass method returns classes that will be added to the body, when GuideChimp
     * waiting for onBeforeChange or(and) onNext, onPrevious  promises resolving
     */
    const parentLoadingClass = cls.getLoadingClass;
    cls.getLoadingClass = () => `${parentLoadingClass()} custom-class`;

    /**
     * The getHighlightElementClass method returns classes to be added to the element to be highlighted.
     */
    const parentGetHighlightClass = cls.getHighlightClass;
    cls.getHighlightClass = () => `${parentGetHighlightClass()} custom-class`;

    /**
     * NAVIGATION
     * ________________________
     */

    /**
     * This method starts the tour and initiates the necessary event listeners
     */
    const parentStart = cls.prototype.start;
    cls.prototype.start = async function (...startArgs) {
        await parentStart.apply(this, startArgs);

        // custom code
        // ...
    };

    /**
     * This method performs the transition from one step to another
     */
    const parentGo = cls.prototype.go;
    cls.prototype.go = async function (...goArgs) {
        await parentGo.apply(this, goArgs);

        // custom code
        // ...
    };

    /**
     * This method navigates one step back
     */
    const parentPrevious = cls.prototype.previous;
    cls.prototype.previous = async function () {
        await parentPrevious.call(this);

        // custom code
        // ...
    };

    /**
     * This method navigates one step forward
     */
    const parentNext = cls.prototype.next;
    cls.prototype.next = async function () {
        await parentNext.call(this);

        // custom code
        // ...
    };

    /**
     * This method terminates the tour, deletes created html elements and unsubscribes from window events
     */
    const parentStop = cls.prototype.stop;
    cls.prototype.stop = async function () {
        await parentStop.call(this);

        // custom code
        // ...
    };
};
