/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the Apache License 2.0 license
 * located in the LICENSE file and
 * NOTICE file corresponding to the section 4 d of the Apache License, Version 2.0
 */

/**
 *
 * @param {Class} cls GuideChimp class
 * @param {Object} factory GuideChimp factory
 * @param {Array} args optional arguments needed for the plugin; for instance, the options object
 */
export default (cls, factory, ...args) => {

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
     * The getHighlightElementClass method returns classes to be added to the element to be highlighted.
     */
    const parentGetHighlightElementClass = cls.getHighlightElementClass;
    cls.getHighlightElementClass = () => `${parentGetHighlightElementClass()} custom-class`;

    /**
     * The getPreloaderClass method returns classes to be added to the preloader element.
     */
    const parentGetPreloaderClass = cls.getPreloaderClass;
    cls.getPreloaderClass = () => `${parentGetPreloaderClass()} custom-class`;

    /**
     * The getOverlayLayerClass method returns classes to be added to the overlay layer.
     */
    const parentGetOverlayLayerClass = cls.getOverlayLayerClass;
    cls.getOverlayLayerClass = () => `${parentGetOverlayLayerClass()} custom-class`;

    /**
     * The getHighlightLayerClass method returns classes to be added to the highlight layer.
     */
    const parentGetHighlightLayerClass = cls.getHighlightLayerClass;
    cls.getHighlightLayerClass = () => `${parentGetHighlightLayerClass()} custom-class`;

    /**
     * The getControlLayerClass method returns classes to be added to the control layer.
     */
    const parentGetControlLayerClass = cls.getControlLayerClass;
    cls.getControlLayerClass = () => `${parentGetControlLayerClass()} custom-class`;

    /**
     * The getInteractionLayerClass method returns classes to be added to the interaction layer.
     */
    const parentGetInteractionLayerClass = cls.getInteractionLayerClass;
    cls.getInteractionLayerClass = () => `${parentGetInteractionLayerClass()} custom-class`;

    /**
     * The getTooltipLayerClass method returns classes to be added to the tooltip layer.
     */
    const parentGetTooltipLayerClass = cls.getTooltipLayerClass;
    cls.getTooltipLayerClass = () => `${parentGetTooltipLayerClass()} custom-class`;

    /**
     * The getTitleClass method returns classes to be added to the title element.
     */
    const parentGetTitleClass = cls.getTitleClass;
    cls.getTitleClass = () => `${parentGetTitleClass()} custom-class`;

    /**
     * The getDescriptionClass method returns classes to be added to the description element.
     */
    const parentGetDescriptionClass = cls.getDescriptionClass;
    cls.getDescriptionClass = () => `${parentGetDescriptionClass()} custom-class`;

    /**
     * The getCustomButtonsLayerClass method returns classes to be added to the custom buttons layer.
     */
    const parentGetCustomButtonsLayerClass = cls.getCustomButtonsLayerClass;
    cls.getCustomButtonsLayerClass = () => `${parentGetCustomButtonsLayerClass()} custom-class`;

    /**
     * The getNavigationClass method returns classes to be added to the navigation layer.
     */
    const parentGetNavigationClass = cls.getNavigationClass;
    cls.getNavigationClass = () => `${parentGetNavigationClass()} custom-class`;

    /**
     * The getNavigationClass method returns classes to be added to the navigation prev element.
     */
    const parentGetNavigationPrevClass = cls.getNavigationPrevClass;
    cls.getNavigationPrevClass = () => `${parentGetNavigationPrevClass()} custom-class`;

    /**
     * The getNavigationNextClass method returns classes to be added to the navigation next element.
     */
    const parentGetNavigationNextClass = cls.getNavigationNextClass;
    cls.getNavigationNextClass = () => `${parentGetNavigationNextClass()} custom-class`;

    /**
     * The getPaginationLayerClass method returns classes to be added to the pagination layer.
     */
    const parentGetPaginationLayerClass = cls.getPaginationLayerClass;
    cls.getPaginationLayerClass = () => `${parentGetPaginationLayerClass()} custom-class`;

    /**
     * The getProgressbarClass method returns classes to be added to the progressbar element.
     */
    const parentGetProgressbarClass = cls.getProgressbarClass;
    cls.getProgressbarClass = () => `${parentGetProgressbarClass()} custom-class`;


    /**
     * NAVIGATION
     * ________________________
     */

    /**
     * This method starts the tour and initiates the necessary event listeners
     */
    const parentStart = cls.prototype.start;
    cls.prototype.start = async (...startArgs) => {
        await parentStart.apply(this, startArgs);

        // custom code
        // ...
    };

    /**
     * This method performs the transition from one step to another
     */
    const parentGo = cls.prototype.go;
    cls.prototype.go = async (...goArgs) => {
        await parentGo.apply(this, goArgs);

        // custom code
        // ...
    };

    /**
     * This method navigates one step back
     */
    const parentPrevious = cls.prototype.previous;
    cls.prototype.previous = async () => {
        await parentPrevious.call(this);

        // custom code
        // ...
    };

    /**
     * This method navigates one step forward
     */
    const parentNext = cls.prototype.next;
    cls.prototype.next = async () => {
        await parentNext.call(this);

        // custom code
        // ...
    };

    /**
     * This method terminates the tour, deletes created html elements and unsubscribes from window events
     */
    const parentStop = cls.prototype.stop;
    cls.prototype.stop = async () => {
        await parentStop.call(this);

        // custom code
        // ...
    };
};
