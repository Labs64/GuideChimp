/*  eslint-disable no-unused-vars, no-param-reassign */

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
 * @param {Array} args any arguments for the needs of your plugin, for example: options object
 */
export default (cls, factory, ...args) => {
    /**
     * INITIALIZATION & OPTIONS
     * ________________________
     */

    /**
     * Add some extra setup logic without having to override the constructor.
     */
    const parentInit = cls.prototype.init;
    cls.prototype.init = () => {
        parentInit();

        /**
         * My event listener
         * @param {Object} to step to go to
         * @param {Object} from step to go from
         */
        this.on('onBeforeChange', (to, from) => {
            // my code
            // ...
        });

        /**
         * Fire my custom event
         */
        this.emit('MyEvent', ...args);

        // my code
        // ...
    };

    /**
     * Add/change default options
     * Override static method
     */
    const parentDefaultOptions = cls.prototype.getDefaultOptions;
    cls.getDefaultOptions = () => ({
        ...parentDefaultOptions(),
        // my default options
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
    cls.getBodyClass = () => `${parentGetBodyClass()} my-class`;

    /**
     * The getHighlightElementClass method returns classes to be added to the element to be highlighted.
     */
    const parentGetHighlightElementClass = cls.getHighlightElementClass;
    cls.getHighlightElementClass = () => `${parentGetHighlightElementClass()} my-class`;

    /**
     * The getPreloaderClass method returns classes to be added to the preloader element.
     */
    const parentGetPreloaderClass = cls.getPreloaderClass;
    cls.getPreloaderClass = () => `${parentGetPreloaderClass()} my-class`;

    /**
     * The getOverlayLayerClass method returns classes to be added to the overlay layer.
     */
    const parentGetOverlayLayerClass = cls.getOverlayLayerClass;
    cls.getOverlayLayerClass = () => `${parentGetOverlayLayerClass()} my-class`;

    /**
     * The getHighlightLayerClass method returns classes to be added to the highlight layer.
     */
    const parentGetHighlightLayerClass = cls.getHighlightLayerClass;
    cls.getHighlightLayerClass = () => `${parentGetHighlightLayerClass()} my-class`;

    /**
     * The getControlLayerClass method returns classes to be added to the control layer.
     */
    const parentGetControlLayerClass = cls.getControlLayerClass;
    cls.getControlLayerClass = () => `${parentGetControlLayerClass()} my-class`;

    /**
     * The getInteractionLayerClass method returns classes to be added to the interaction layer.
     */
    const parentGetInteractionLayerClass = cls.getInteractionLayerClass;
    cls.getInteractionLayerClass = () => `${parentGetInteractionLayerClass()} my-class`;

    /**
     * The getTooltipLayerClass method returns classes to be added to the tooltip layer.
     */
    const parentGetTooltipLayerClass = cls.getTooltipLayerClass;
    cls.getTooltipLayerClass = () => `${parentGetTooltipLayerClass()} my-class`;

    /**
     * The getTitleClass method returns classes to be added to the title element.
     */
    const parentGetTitleClass = cls.getTitleClass;
    cls.getTitleClass = () => `${parentGetTitleClass()} my-class`;

    /**
     * The getDescriptionClass method returns classes to be added to the description element.
     */
    const parentGetDescriptionClass = cls.getDescriptionClass;
    cls.getDescriptionClass = () => `${parentGetDescriptionClass()} my-class`;

    /**
     * The getCustomButtonsLayerClass method returns classes to be added to the custom buttons layer.
     */
    const parentGetCustomButtonsLayerClass = cls.getCustomButtonsLayerClass;
    cls.getCustomButtonsLayerClass = () => `${parentGetCustomButtonsLayerClass()} my-class`;

    /**
     * The getNavigationClass method returns classes to be added to the navigation layer.
     */
    const parentGetNavigationClass = cls.getNavigationClass;
    cls.getNavigationClass = () => `${parentGetNavigationClass()} my-class`;

    /**
     * The getNavigationClass method returns classes to be added to the navigation prev element.
     */
    const parentGetNavigationPrevClass = cls.getNavigationPrevClass;
    cls.getNavigationPrevClass = () => `${parentGetNavigationPrevClass()} my-class`;

    /**
     * The getNavigationNextClass method returns classes to be added to the navigation next element.
     */
    const parentGetNavigationNextClass = cls.getNavigationNextClass;
    cls.getNavigationNextClass = () => `${parentGetNavigationNextClass()} my-class`;

    /**
     * The getPaginationLayerClass method returns classes to be added to the pagination layer.
     */
    const parentGetPaginationLayerClass = cls.getPaginationLayerClass;
    cls.getPaginationLayerClass = () => `${parentGetPaginationLayerClass()} my-class`;

    /**
     * The getProgressbarClass method returns classes to be added to the progressbar element.
     */
    const parentGetProgressbarClass = cls.getProgressbarClass;
    cls.getProgressbarClass = () => `${parentGetProgressbarClass()} my-class`;


    /**
     * NAVIGATION
     * ________________________
     */

    /**
     * The start method starts the tour and initiates the necessary window event listeners
     */
    const parentStart = cls.prototype.start;
    cls.prototype.start = async (...startArgs) => {
        await parentStart(...startArgs);

        // my code
        // ...
    };

    /**
     * The go method makes the transition from one step to another
     */
    const parentGo = cls.prototype.go;
    cls.prototype.go = async (...goArgs) => {
        await parentGo(...goArgs);

        // my code
        // ...
    };

    /**
     * The previous method moves one step back
     */
    const parentPrevious = cls.prototype.previous;
    cls.prototype.previous = async () => {
        await parentPrevious();

        // my code
        // ...
    };

    /**
     * The next method moves one step forward
     */
    const parentNext = cls.prototype.next;
    cls.prototype.next = async () => {
        await parentNext();

        // my code
        // ...
    };

    /**
     * The stop method terminates the guide, deletes created html elements and unsubscribes from window events
     */
    const parentStop = cls.prototype.stop;
    cls.prototype.stop = async () => {
        await parentStop();

        // my code
        // ...
    };
};
