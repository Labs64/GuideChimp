/* eslint-disable class-methods-use-this */
/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the Apache License 2.0 license
 * located in the LICENSE file and
 * NOTICE file corresponding to the section 4 d of the Apache License, Version 2.0
 */

// global cache
const cache = new Map();

export default class GuideChimp {
    /**
     * GuideChimp constructor
     * @param tour
     * @param options
     */
    constructor(tour, options = {}) {
        this.step = null;
        this.steps = [];

        this.tour = null;
        this.options = {};

        this.cache = cache;

        this.listeners = [];

        this.setOptions(options);
        this.setTour(tour);

        this.init();
    }

    /**
     * Called after construction, this hook allows you to add some extra setup
     * logic without having to override the constructor.
     */
    init() {

    }

    /**
     * Default options
     * @return {Object}
     */
    static getDefaultOptions() {
        return {
            position: 'bottom',
            useKeyboard: true,
            exitEscape: true,
            exitOverlay: true,
            showPagination: true,
            showProgressbar: true,
            interaction: true,
            padding: 10,
            scrollPadding: 10,
        };
    }

    static getBodyClass() {
        return 'gc';
    }

    static getDefaultElementClass() {
        return 'gc-default';
    }

    static getFixStackingContext() {
        return 'gc-fix-stacking-context';
    }

    static getHighlightElementClass() {
        return 'gc-highlighted';
    }

    static getPreloaderClass() {
        return 'gc-preloader';
    }

    static getOverlayLayerClass() {
        return 'gc-overlay';
    }

    static getFixedClass() {
        return 'gc-fixed';
    }

    static getHighlightLayerClass() {
        return 'gc-highlight';
    }

    static getControlLayerClass() {
        return 'gc-control';
    }

    static getInteractionLayerClass() {
        return 'gc-interaction';
    }

    static getTooltipLayerClass() {
        return 'gc-tooltip';
    }

    static getTooltipTailClass() {
        return 'gc-tooltip-tail';
    }

    static getTitleClass() {
        return 'gc-title';
    }

    static getDescriptionClass() {
        return 'gc-description';
    }

    static getCustomButtonsLayerClass() {
        return 'gc-custom-buttons';
    }

    static getNavigationClass() {
        return 'gc-navigation';
    }

    static getNavigationPrevClass() {
        return 'gc-navigation-prev';
    }

    static getNavigationNextClass() {
        return 'gc-navigation-next';
    }

    static getCloseClass() {
        return 'gc-close';
    }

    static getPaginationLayerClass() {
        return 'gc-pagination';
    }

    static getPaginationItemClass() {
        return 'gc-pagination-item';
    }

    static getPaginationCurrentItemClass() {
        return 'gc-pagination-active';
    }

    static getProgressbarClass() {
        return 'gc-progressbar';
    }

    static getDisableInteractionClass() {
        return 'gc-disable';
    }

    static getCopyrightClass() {
        return 'gc-copyright';
    }

    static getHiddenClass() {
        return 'gc-hidden';
    }

    static getRelativePositionClass() {
        return 'gc-relative';
    }

    /**
     * Get element offset
     * @param el
     * @return {{top: number, left: number, width: number, height: number}}
     */
    static getElementOffset(el) {
        const { body, documentElement } = document;
        const scrollTop = window.pageYOffset || documentElement.scrollTop || body.scrollTop;
        const scrollLeft = window.pageXOffset || documentElement.scrollLeft || body.scrollLeft;
        const { top, right, bottom, left, width, height, x, y } = el.getBoundingClientRect();
        return { right, bottom, width, height, x, y, top: top + scrollTop, left: left + scrollLeft };
    }

    /**
     * Check if el or his parent has fixed position
     * @param el
     * @return {boolean}
     */
    static isElementFixed(el) {
        const { parentNode } = el;

        if (!parentNode || parentNode.nodeName === 'HTML') {
            return false;
        }

        const elStyle = getComputedStyle(el);

        if (elStyle.getPropertyValue('position') === 'fixed') {
            return true;
        }

        return this.isElementFixed(parentNode);
    }

    /**
     * Add class to el
     * @param el
     * @param className
     */
    static addElementClass(el, className) {
        if (el instanceof SVGElement) {
            el.setAttribute('class', `${el.getAttribute('class') || ''} ${className}`);
            return;
        }

        el.classList.add(className);
    }

    /**
     * Remove class from el
     * @param el
     * @param className
     */
    static removeElementClass(el, className) {
        if (el instanceof SVGElement) {
            const classes = el.getAttribute('class') || '';
            classes.replace(className, '');

            el.setAttribute('class', classes);
            return;
        }

        el.classList.remove(className);
    }

    /**
     * Set tour name or steps
     * @param tour
     * @return {this}
     */
    setTour(tour) {
        this.tour = (Array.isArray(tour)) ? [...tour] : tour;
        return this;
    }

    /**
     * Get tour name or steps
     * @return {null}
     */
    getTour() {
        return this.tour;
    }

    /**
     * Set tour options
     * @param options
     * @return {this}
     */
    setOptions(options) {
        this.options = { ...this.constructor.getDefaultOptions(), ...options };
        return this;
    }

    /**
     * Get tour options
     */
    getOptions() {
        return this.options;
    }

    /**
     * Start tour
     * @param number step number or it index
     * @param useIndex whether to use step number or index
     * @return {Promise<boolean>}
     */
    async start(number = 0, useIndex = true) {
        // emit start event
        await this.emit('onStart');

        const isStarted = await this.go(number, useIndex);

        if (isStarted) {
            // add a class that increase the specificity of guidechimp classes
            document.body.classList.add(this.constructor.getBodyClass());

            // turn on keyboard navigation
            if (this.options.useKeyboard) {
                this.setUpOnKeydownListener();
            }

            // on window resize
            this.setUpOnWindowResizeListener();
        }

        return isStarted;
    }

    /**
     * Go to step
     * @param number step number or it index
     * @param useIndex whether to use step number or index
     * @return {Promise<boolean>}
     */
    async go(number, useIndex = true) {
        if (!this.tour || !this.tour.length) {
            return false;
        }

        const stepNumber = (useIndex) ? parseInt(number, 10) : number;
        const fromStep = { ...this.step };
        let toStep = null;

        // skip if this step is already displayed
        const isSameStep = (useIndex)
            ? (this.steps.indexOf(this.step) === stepNumber)
            : (this.step && this.step.step === stepNumber);

        if (isSameStep) {
            return false;
        }

        this.steps = [];
        // if tour is empty or is string, looks for steps among the data attributes
        if (typeof this.tour === 'string') {
            this.steps = this.getDataSteps(this.tour);
        } else if (Array.isArray(this.tour)) {
            this.steps = this.getJsSteps(this.tour);
        }

        if (!this.steps.length) {
            return false;
        }

        // sort steps by step
        this.steps = this.sortSteps(this.steps);
        for (let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i];
            const isToStep = (useIndex) ? (i === stepNumber) : (step.step === stepNumber);

            if (isToStep) {
                toStep = step;
                break;
            }
        }

        if (!toStep) {
            return false;
        }

        this.resetElementsHighlighting();

        this.showOverlayLayer();

        this.startPreloader();

        const { onBeforeChange, onAfterChange } = toStep;

        const results = await this.emit('onBeforeChange', toStep, fromStep);

        if (results.some((r) => r === false)) {
            return false;
        }

        if (onBeforeChange) {
            if (await Promise.resolve().then(() => onBeforeChange.call(this, toStep, fromStep)) === false) {
                return false;
            }
        }

        this.stopPreloader();

        this.step = toStep;

        const { element, position, buttons } = this.step;
        const el = this.getStepElement(element);

        this.scrollParentToChildElement(el);
        this.scrollTo(el);

        const highlightLayer = this.showHighlightLayer();
        const interactionLayer = this.showInteractionLayer();
        const controlLayer = this.showControlLayer();

        this.setHighlightLayerPosition(highlightLayer, el);
        this.setInteractionLayerPosition(interactionLayer, el);
        this.setControlLayerPosition(controlLayer, el);

        const tooltipLayer = this.showTooltipLayer();
        this.showTooltipTail();

        this.showProgressbar();
        this.showTitle(this.step.title);
        this.showDescription(this.step.description);
        this.showClose();

        this.showCustomButtonsLayer(buttons);

        const navigationLayer = this.showNavigation();
        this.showNavigationPrev();
        this.showPagination();
        this.showNavigationNext();

        const isNeedHideNavigation = Array.from(navigationLayer.children)
            .every((v) => v.classList.contains(this.constructor.getHiddenClass()));

        if (isNeedHideNavigation) {
            navigationLayer.classList.add(this.constructor.getHiddenClass());
        } else {
            navigationLayer.classList.remove(this.constructor.getHiddenClass());
        }

        this.showCopyright();

        this.setTooltipLayerPosition(tooltipLayer, el, { position, boundary: document.documentElement });

        this.highlightElement(el);

        setTimeout(() => {
            this.scrollTo(tooltipLayer, 'smooth');
        }, 300);

        this.emit('onAfterChange', toStep, fromStep);

        if (onAfterChange) {
            onAfterChange.call(this, toStep, fromStep);
        }

        return true;
    }

    async previous() {
        if (this.step) {
            const prevStepIndex = (this.steps.indexOf(this.step) - 1);
            return (prevStepIndex > -1) ? this.go(prevStepIndex, true) : false;
        }

        return false;
    }

    async next() {
        if (this.step) {
            const nextStepIndex = (this.steps.indexOf(this.step) + 1);
            return (nextStepIndex < this.steps.length) ? this.go(nextStepIndex, true) : false;
        }

        return false;
    }

    async stop() {
        const stepIndex = this.steps.indexOf(this.step);

        if (stepIndex === this.steps.length - 1) {
            await this.emit('onComplete');
        }

        await this.emit('onStop');

        this.step = null;
        this.steps = [];

        // remove the class that increase the specificity of the guidechimp classes
        document.body.classList.remove(this.constructor.getBodyClass());

        // shut up events listeners
        this.shutUpOnKeydownListener();
        this.shutUpOnWindowResizeListener();

        this.removePreloaderElement();
        this.removeOverlayLayer();
        this.removeControlLayer();
        this.removeHighlightLayer();
        this.removeInteractionLayer();
        this.resetElementsHighlighting();
        this.cache.clear();

        return this;
    }

    getDataSteps(tour) {
        const dataPrefix = 'data-guidechimp';
        let tourStepsEl = Array.from(document.querySelectorAll(`[${dataPrefix}-tour*='${tour}']`));

        // filter steps by tour name
        tourStepsEl = tourStepsEl.filter((v) => {
            const tours = v.getAttribute(`${dataPrefix}-tour`).split(',');
            return tours.includes(this.tour);
        });

        const dataTourRegExp = new RegExp(`^${dataPrefix}-${tour}-[^-]+$`);
        const dataGlobalRegExp = new RegExp(`^${dataPrefix}-[^-]+$`);

        return tourStepsEl.map((el, i) => {
            const stepAttrs = {};

            for (let j = 0; j < el.attributes.length; j++) {
                const { name: attrName, value: attrValue } = el.attributes[j];

                const isTourAttr = dataTourRegExp.test(attrName);
                const isGlobalAttr = (isTourAttr) ? false : dataGlobalRegExp.test(attrName);

                if (isTourAttr || isGlobalAttr) {
                    const attrShortName = (isTourAttr)
                        ? attrName.replace(`${dataPrefix}-${tour}-`, '')
                        : attrName.replace(`${dataPrefix}-`, '');

                    if (attrShortName !== 'tour') {
                        if (isTourAttr || (isGlobalAttr && !stepAttrs[attrShortName])) {
                            stepAttrs[attrShortName] = attrValue;
                        }
                    }
                }
            }

            return {
                step: i,
                title: '',
                description: '',
                position: this.options.position,
                interaction: this.options.interaction,
                ...stepAttrs,
                element: el,
            };
        });
    }

    getJsSteps(tour) {
        return tour.map((v, i) => ({ ...v, step: v.step || i }));
    }

    sortSteps(steps) {
        const copy = [...steps];

        return copy.sort((a, b) => {
            if (a.step < b.step) {
                return -1;
            }
            if (a.step > b.step) {
                return 1;
            }
            return 0;
        });
    }

    getStepElement(selector) {
        let el = (selector instanceof HTMLElement)
            ? selector
            : document.querySelector(selector);

        if ((!el || (el.style.display === 'none' || el.style.visibility === 'hidden'))) {
            el = this.showDefaultElement();
        }

        return el;
    }

    getScrollableParentElement(el, axis = ['x', 'y']) {
        const regex = /(auto|scroll)/;

        const elStyle = getComputedStyle(el);

        const getScrollableParent = (parent) => {
            if (!parent || parent === document.body) {
                return document.body;
            }

            const parentStyle = getComputedStyle(parent);

            if (elStyle.getPropertyValue('position') === 'fixed'
                && parentStyle.getPropertyValue('position') === 'static') {
                return getScrollableParent(parent.parentElement);
            }

            let overflow = '';

            const overflowAxis = (Array.isArray(axis)) ? axis : [axis];

            overflowAxis.forEach((v) => {
                overflow += parentStyle.getPropertyValue(`overflow-${v}`);
            });

            const isScrollable = regex.test(overflow);

            return (isScrollable) ? parent : getScrollableParent(parent.parentElement);
        };

        return (elStyle.getPropertyValue('position') === 'fixed')
            ? document.body
            : getScrollableParent(el.parentElement);
    }

    scrollParentToChildElement(el) {
        const scrollableParentElX = this.getScrollableParentElement(el, 'x');
        const scrollableParentElY = this.getScrollableParentElement(el, 'y');

        const { scrollPadding } = this.options;

        // scroll a parent scrollable element to a child element
        if (scrollableParentElY !== document.body) {
            scrollableParentElY.scrollTop = el.offsetTop - scrollableParentElY.offsetTop - scrollPadding;
        }

        if (scrollableParentElX !== document.body) {
            scrollableParentElX.scrollLeft = el.offsetLeft - scrollableParentElX.offsetLeft - scrollPadding;
        }

        return this;
    }

    scrollTo(el, behavior = 'auto') {
        const { top, bottom, left, right } = el.getBoundingClientRect();
        const { innerWidth, innerHeight } = window;

        const { scrollPadding } = this.options;

        if (!(top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth)) {
            window.scrollBy({ behavior, top: top - scrollPadding, left: left - scrollPadding });
        }

        return this;
    }

    highlightElement(el) {
        let parentEl = el.parentElement;

        while (parentEl) {
            if (parentEl === document.body) {
                break;
            }

            if (el instanceof SVGElement && parentEl.tagName.toLowerCase() === 'svg') {
                this.constructor.addElementClass(parentEl, `${this.constructor.getHighlightElementClass()}`);
                this.constructor.addElementClass(parentEl, this.constructor.getRelativePositionClass());
            }

            const parentElStyle = getComputedStyle(parentEl);

            const zIndex = parentElStyle.getPropertyValue('z-index');
            const opacity = parentElStyle.getPropertyValue('opacity');
            const transform = parentElStyle.getPropertyValue('transform');

            if (/[0-9]+/.test(zIndex) || opacity < 1 || (transform && transform !== 'none')) {
                this.constructor.addElementClass(parentEl, this.constructor.getFixStackingContext());
            }

            parentEl = parentEl.parentElement;
        }

        this.constructor.addElementClass(el, this.constructor.getHighlightElementClass());

        const elStyle = getComputedStyle(el);

        if (!['absolute', 'relative', 'fixed'].includes(elStyle.getPropertyValue('position'))) {
            this.constructor.addElementClass(el, this.constructor.getRelativePositionClass());
        }

        const highlightEls = this.cache.get('highlightEls') || new Set();

        highlightEls.add(el);

        this.cache.set('highlightEls', highlightEls);

        return this;
    }

    resetElementHighlighting(el) {
        if (el) {
            const highlightEls = this.cache.get('highlightEls');

            if (highlightEls) {
                highlightEls.delete(el);
            }

            el.classList.remove(this.constructor.getHighlightElementClass());
            el.classList.remove(this.constructor.getRelativePositionClass());

            let parentEl = el.parentElement;

            while (parentEl) {
                if (parentEl === document.body) {
                    break;
                }

                parentEl.classList.remove(this.constructor.getFixStackingContext());
                parentEl = parentEl.parentElement;
            }
        }

        return this;
    }

    resetElementsHighlighting() {
        const highlightEls = this.cache.get('highlightEls');

        if (highlightEls) {
            const highlightElsArray = Array.from(highlightEls);

            if (highlightElsArray.length) {
                highlightEls.forEach((el) => {
                    this.resetElementHighlighting(el);
                });
            }
        }

        return this;
    }

    setLayerPosition(layer, el) {
        if (!layer || !el) {
            return this;
        }

        let { padding } = this.options;

        const elStyle = getComputedStyle(el);

        if (elStyle.getPropertyValue('position') === 'floating') {
            padding = 0;
        }

        const { width, height, top, left } = this.constructor.getElementOffset(el);

        if (this.constructor.isElementFixed(el)) {
            this.constructor.addElementClass(layer, this.constructor.getFixedClass());
        } else {
            this.constructor.removeElementClass(layer, this.constructor.getFixedClass());
        }

        const { style: layerStyle } = layer;

        // set new position
        layerStyle.cssText = `width: ${width + padding}px;
        height: ${height + padding}px;
        top: ${top - (padding / 2)}px;
        left: ${left - (padding / 2)}px;`;

        return this;
    }

    setHighlightLayerPosition(...args) {
        return this.setLayerPosition(...args);
    }

    setInteractionLayerPosition(...args) {
        return this.setLayerPosition(...args);
    }

    setControlLayerPosition(layer, el) {
        if (!layer || !el) {
            return this;
        }

        let { padding } = this.options;

        const elStyle = getComputedStyle(el);

        if (elStyle.getPropertyValue('position') === 'floating') {
            padding = 0;
        }

        const { pageXOffset } = window;
        const { width: docElWidth } = document.documentElement.getBoundingClientRect();
        const { height: elHeight, top: elTop, left: elLeft, right: elRight } = this.constructor.getElementOffset(el);

        const height = elHeight + padding;
        const top = elTop - (padding / 2);
        const left = (pageXOffset < pageXOffset + (elLeft - (padding / 2))) ? pageXOffset : (elLeft - (padding / 2));
        const width = (pageXOffset + docElWidth > pageXOffset + (elRight + (padding / 2)))
            ? docElWidth
            : (elRight + (padding / 2));

        if (this.constructor.isElementFixed(el)) {
            this.constructor.addElementClass(layer, this.constructor.getFixedClass());
        } else {
            this.constructor.removeElementClass(layer, this.constructor.getFixedClass());
        }

        const { style: layerStyle } = layer;

        // set new position
        layerStyle.cssText = `width: ${width}px;
        height: ${height}px;
        top: ${top}px;
        left: ${left}px;`;

        return this;
    }

    setTooltipLayerPosition(tooltipLayer, el, options = {}) {
        let { position, boundary } = options;

        position = position || this.options.position;

        let alignment = null;

        if (!boundary) {
            boundary = window;
        }

        let { padding } = this.options;

        const elStyle = getComputedStyle(el);

        if (elStyle.getPropertyValue('position') === 'floating') {
            padding = 0;
        }

        const { style } = tooltipLayer;

        // reset tooltip styles
        style.top = null;
        style.right = null;
        style.bottom = null;
        style.left = null;
        style.marginLeft = null;
        style.marginTop = null;
        style.transform = null;

        const {
            top: elTop,
            bottom: elBottom,
            left: elLeft,
            right: elRight,
            width: elWidth,
            height: elHeight,
        } = el.getBoundingClientRect();

        const { height: tooltipHeight, width: tooltipWith } = tooltipLayer.getBoundingClientRect();

        // find out min tooltip width
        const cloneTooltip = tooltipLayer.cloneNode();
        cloneTooltip.style.visibility = 'hidden';
        cloneTooltip.innerHTML = '';

        tooltipLayer.parentElement.appendChild(cloneTooltip);

        const { width: minTooltipWidth } = cloneTooltip.getBoundingClientRect();

        cloneTooltip.parentElement.removeChild(cloneTooltip);

        let boundaryRect = {};

        if (boundary === window) {
            boundaryRect = new DOMRect(0, 0, window.innerWidth, window.innerHeight);
        } else {
            const { x, y } = boundary.getBoundingClientRect();
            boundaryRect = new DOMRect(x, y, boundary.scrollWidth, boundary.scrollHeight);
        }

        const {
            top: boundaryTop,
            bottom: boundaryBottom,
            left: boundaryLeft,
            right: boundaryRight,
        } = boundaryRect;


        // if the element is default element, skip position and alignment calculation
        if (!el.classList.contains(this.constructor.getDefaultElementClass())) {
            // calculate position
            const positions = ['bottom', 'right', 'left', 'top'];

            // check if the tooltip can be placed on top
            if (tooltipHeight > (elTop - boundaryTop)) {
                positions.splice(positions.indexOf('top'), 1);
            }

            // check if the tooltip can be placed on bottom
            if (tooltipHeight > boundaryBottom - elBottom) {
                positions.splice(positions.indexOf('bottom'), 1);
            }

            // check if the tooltip can be placed on left
            if (minTooltipWidth > elLeft - boundaryLeft) {
                positions.splice(positions.indexOf('left'), 1);
            }

            // check if the tooltip can be placed on right
            if (minTooltipWidth > boundaryRight - elRight) {
                positions.splice(positions.indexOf('right'), 1);
            }

            if (positions.length) {
                position = positions.includes(position) ? position : positions[0];
            } else {
                position = 'floating';
            }

            if (position === 'top' || position === 'bottom') {
                const alignments = ['left', 'right', 'middle'];

                // valid left space must be at least tooltip width
                if (boundaryRight - elLeft < minTooltipWidth) {
                    alignments.splice(alignments.indexOf('left'), 1);
                }

                // valid right space must be at least tooltip width
                if (elRight - boundaryLeft < minTooltipWidth) {
                    alignments.splice(alignments.indexOf('right'), 1);
                }

                // valid middle space must be at least half width from both sides
                if (((elLeft + (elWidth / 2)) - boundaryLeft) < (minTooltipWidth / 2)
                    || (boundaryRight - (elRight - (elWidth / 2))) < (minTooltipWidth / 2)) {
                    alignments.splice(alignments.indexOf('middle'), 1);
                }

                alignment = (alignments.length) ? alignments[0] : 'middle';
            }
        }

        const root = document.documentElement;

        tooltipLayer.removeAttribute('data-guidechimp-position');
        tooltipLayer.setAttribute('data-guidechimp-position', position);

        switch (position) {
            case 'top':
                style.bottom = `${elHeight + padding}px`;
                break;
            case 'right':
                style.left = `${(elRight + (padding / 2)) - root.clientLeft}px`;
                break;
            case 'left':
                style.right = `${root.clientWidth - (elLeft - (padding / 2))}px`;
                break;
            case 'bottom':
                style.top = `${elHeight + padding}px`;
                break;
            default: {
                style.left = '50%';
                style.top = '50%';
                style.transform = 'translate(-50%,-50%)';
            }
        }

        tooltipLayer.removeAttribute('data-guidechimp-alignment');

        if (alignment) {
            tooltipLayer.setAttribute('data-guidechimp-alignment', alignment);

            switch (alignment) {
                case 'left': {
                    style.left = `${elLeft - (padding / 2)}px`;
                    break;
                }
                case 'right': {
                    style.right = `${root.clientWidth - elRight - (padding / 2)}px`;
                    break;
                }
                default: {
                    if ((elLeft + (elWidth / 2)) < (tooltipWith / 2)
                        || (elLeft + (elWidth / 2) + (tooltipWith / 2)) > root.clientWidth) {
                        style.left = `${((root.clientWidth) / 2) - (tooltipWith / 2)}px`;
                    } else {
                        style.left = `${elLeft + (elWidth / 2) - (tooltipWith / 2)}px`;
                    }
                }
            }
        }

        return this;
    }

    startPreloader() {
        const highlightLayer = this.cache.has('highlightLayer')
            ? this.cache.get('highlightLayer')
            : document.body.querySelector(`.${this.constructor.getHighlightLayerClass()}`);

        if (highlightLayer) {
            highlightLayer.style.visibility = 'hidden';
        }

        const controlLayer = this.cache.has('controlLayer')
            ? this.cache.get('controlLayer')
            : document.body.querySelector(`.${this.constructor.getControlLayerClass()}`);

        if (controlLayer) {
            controlLayer.style.visibility = 'hidden';
        }

        const interactionLayer = this.cache.has('interactionLayer')
            ? this.cache.get('interactionLayer')
            : document.body.querySelector(`.${this.constructor.getInteractionLayerClass()}`);

        if (interactionLayer) {
            interactionLayer.style.visibility = 'hidden';
        }

        const tooltipLayer = this.cache.has('tooltipLayer')
            ? this.cache.get('tooltipLayer')
            : document.body.querySelector(`.${this.constructor.getTooltipLayerClass()}`);

        if (tooltipLayer) {
            tooltipLayer.style.visibility = 'hidden';
        }

        this.showPreloaderElement();

        return this;
    }

    stopPreloader() {
        const highlightLayer = this.cache.has('highlightLayer')
            ? this.cache.get('highlightLayer')
            : document.body.querySelector(`.${this.constructor.getHighlightLayerClass()}`);

        if (highlightLayer) {
            highlightLayer.style.visibility = 'visible';
        }

        const controlLayer = this.cache.has('controlLayer')
            ? this.cache.get('controlLayer')
            : document.body.querySelector(`.${this.constructor.getControlLayerClass()}`);

        if (controlLayer) {
            controlLayer.style.visibility = 'visible';
        }

        const interactionLayer = this.cache.has('interactionLayer')
            ? this.cache.get('interactionLayer')
            : document.body.querySelector(`.${this.constructor.getInteractionLayerClass()}`);

        if (interactionLayer) {
            interactionLayer.style.visibility = 'visible';
        }

        const tooltipLayer = this.cache.has('tooltipLayer')
            ? this.cache.get('tooltipLayer')
            : document.body.querySelector(`.${this.constructor.getTooltipLayerClass()}`);

        if (tooltipLayer) {
            tooltipLayer.style.visibility = 'visible';
        }

        this.removePreloaderElement();

        return this;
    }

    showDefaultElement() {
        let defaultEl = this.cache.get('defaultEl');

        if (!defaultEl) {
            defaultEl = document.createElement('div');
            document.body.appendChild(defaultEl);
        }

        defaultEl.className = this.constructor.getDefaultElementClass();

        this.cache.set('defaultEl', defaultEl);

        return defaultEl;
    }

    showPreloaderElement() {
        let preloaderEl = this.cache.get('preloaderEl');

        if (!preloaderEl) {
            preloaderEl = document.createElement('div');
            preloaderEl.className = this.constructor.getPreloaderClass();
            document.body.appendChild(preloaderEl);
        }

        this.cache.set('preloaderEl', preloaderEl);

        return preloaderEl;
    }

    removePreloaderElement() {
        const preloaderEl = this.cache.get('preloaderEl');

        if (preloaderEl) {
            preloaderEl.parentElement.removeChild(preloaderEl);
        }

        this.cache.delete('preloaderEl');

        return this;
    }

    showOverlayLayer() {
        let overlayLayer = this.cache.get('overlayLayer');

        if (!overlayLayer) {
            overlayLayer = document.createElement('div');
            overlayLayer.className = this.constructor.getOverlayLayerClass();
            overlayLayer.onclick = (this.options.exitOverlay) ? () => this.stop() : null;
            document.body.appendChild(overlayLayer);
        }

        this.cache.set('overlayLayer', overlayLayer);

        return overlayLayer;
    }

    removeOverlayLayer() {
        const overlayLayer = this.cache.get('overlayLayer');

        if (overlayLayer) {
            overlayLayer.parentElement.removeChild(overlayLayer);
        }

        this.cache.delete('overlayLayer');

        return this;
    }

    showHighlightLayer() {
        let highlightLayer = this.cache.get('highlightLayer');

        if (!highlightLayer) {
            highlightLayer = document.createElement('div');
            highlightLayer.className = this.constructor.getHighlightLayerClass();
            document.body.appendChild(highlightLayer);
        }

        this.cache.set('highlightLayer', highlightLayer);

        return highlightLayer;
    }

    removeHighlightLayer() {
        const highlightLayer = this.cache.get('highlightLayer');

        if (highlightLayer) {
            highlightLayer.parentElement.removeChild(highlightLayer);
        }

        this.cache.delete('highlightLayer');

        return this;
    }

    showControlLayer() {
        let controlLayer = this.cache.get('controlLayer');

        if (!controlLayer) {
            controlLayer = document.createElement('div');
            controlLayer.className = this.constructor.getControlLayerClass();
            document.body.appendChild(controlLayer);
        }

        this.cache.set('controlLayer', controlLayer);

        return controlLayer;
    }

    removeControlLayer() {
        const controlLayer = this.cache.get('controlLayer');

        if (controlLayer) {
            controlLayer.parentElement.removeChild(controlLayer);
        }

        this.cache.delete('controlLayer');

        return this;
    }

    showInteractionLayer() {
        // get or create interaction layer
        let interactionLayer = this.cache.get('interactionLayer');

        if (!interactionLayer) {
            interactionLayer = document.createElement('div');
            document.body.appendChild(interactionLayer);
        }

        interactionLayer.className = this.constructor.getInteractionLayerClass();

        let { interaction } = this.options;

        if (this.step && typeof this.step.interaction === 'boolean') {
            interaction = this.step.interaction;
        }

        // disable interaction
        if (!interaction) {
            interactionLayer.classList.add(this.constructor.getDisableInteractionClass());
        }

        this.cache.set('interactionLayer', interactionLayer);

        return interactionLayer;
    }

    removeInteractionLayer() {
        const interactionLayer = this.cache.get('interactionLayer');

        if (interactionLayer) {
            interactionLayer.parentElement.removeChild(interactionLayer);
        }

        this.cache.delete('interactionLayer');

        return this;
    }

    showTooltipLayer() {
        const parent = this.showControlLayer();

        let tooltipLayer = this.cache.get('tooltipLayer');

        if (!tooltipLayer) {
            tooltipLayer = document.createElement('div');
            tooltipLayer.setAttribute('role', 'dialog');
            parent.appendChild(tooltipLayer);
        }

        tooltipLayer.className = this.constructor.getTooltipLayerClass();

        this.cache.set('tooltipLayer', tooltipLayer);

        return tooltipLayer;
    }

    showTooltipTail() {
        const parent = this.showTooltipLayer();

        let tooltipTailEl = this.cache.get('tooltipTailEl');

        if (!tooltipTailEl) {
            tooltipTailEl = document.createElement('div');
            parent.appendChild(tooltipTailEl);
        }

        tooltipTailEl.className = this.constructor.getTooltipTailClass();

        this.cache.set('tooltipTailEl', tooltipTailEl);

        return tooltipTailEl;
    }

    showClose() {
        const parent = this.showTooltipLayer();

        let closeEl = this.cache.get('closeEl');

        if (!closeEl) {
            closeEl = document.createElement('div');
            closeEl.onclick = () => this.stop();
            parent.appendChild(closeEl);
        }

        closeEl.className = this.constructor.getCloseClass();

        this.cache.set('closeEl', closeEl);

        return closeEl;
    }

    showProgressbar() {
        const parent = this.showTooltipLayer();

        let progressbarEl = this.cache.get('progressbarEl');

        if (!progressbarEl) {
            progressbarEl = document.createElement('div');
            progressbarEl.setAttribute('role', 'progress');
            progressbarEl.setAttribute('aria-valuemin', 0);
            progressbarEl.setAttribute('aria-valuemax', 100);
            parent.appendChild(progressbarEl);
        }

        const stepIndex = this.steps.indexOf(this.step);

        if (stepIndex >= 0 && this.steps.length) {
            const progress = ((stepIndex + 1) / this.steps.length) * 100;
            progressbarEl.setAttribute('aria-valuenow', progress);
            progressbarEl.style.cssText = `width: ${progress}%;`;
        }

        progressbarEl.className = this.constructor.getProgressbarClass();

        if (!this.options.showProgressbar) {
            progressbarEl.classList.add(this.constructor.getHiddenClass());
        }

        this.cache.set('progressbarEl', progressbarEl);

        return progressbarEl;
    }

    showTitle(title) {
        let titleEl = this.cache.get('titleEl');

        if (!titleEl) {
            titleEl = document.createElement('div');
            this.showTooltipLayer().appendChild(titleEl);
        }

        titleEl.className = this.constructor.getTitleClass();

        if (!title) {
            titleEl.classList.add(this.constructor.getHiddenClass());
        }

        titleEl.innerHTML = title || '';

        this.cache.set('titleEl', titleEl);

        return titleEl;
    }

    showDescription(description) {
        let descriptionEl = this.cache.get('descriptionEl');

        if (!descriptionEl) {
            descriptionEl = document.createElement('div');
            this.showTooltipLayer().appendChild(descriptionEl);
        }

        descriptionEl.className = this.constructor.getDescriptionClass();

        if (!description) {
            descriptionEl.classList.add(this.constructor.getHiddenClass());
        }

        descriptionEl.innerHTML = description || '';

        this.cache.set('descriptionEl', descriptionEl);

        return descriptionEl;
    }

    showCustomButtonsLayer(buttons = []) {
        let customButtonsLayer = this.cache.get('customButtonsLayer');

        if (!customButtonsLayer) {
            customButtonsLayer = document.createElement('div');
            this.showTooltipLayer().appendChild(customButtonsLayer);
        }

        customButtonsLayer.className = this.constructor.getCustomButtonsLayerClass();

        if (!buttons.length) {
            customButtonsLayer.classList.add(this.constructor.getHiddenClass());
        }

        while (customButtonsLayer.firstChild) {
            customButtonsLayer.removeChild(customButtonsLayer.firstChild);
        }

        buttons.forEach((v) => {
            if (v instanceof HTMLElement) {
                customButtonsLayer.appendChild(v);
            } else {
                const { tagName = 'button', title = '', class: className, onClick } = v;
                const customButton = document.createElement(tagName);

                customButton.innerHTML = title;
                if (className) {
                    customButton.className = className;
                }

                if (onClick) {
                    customButton.onclick = onClick;
                }

                customButtonsLayer.appendChild(customButton);
            }
        });

        this.cache.set('customButtonsLayer', customButtonsLayer);

        return customButtonsLayer;
    }

    showNavigation() {
        let navigationLayer = this.cache.get('navigationLayer');

        if (!navigationLayer) {
            navigationLayer = document.createElement('div');
            this.showTooltipLayer().appendChild(navigationLayer);
        }

        navigationLayer.className = this.constructor.getNavigationClass();

        this.cache.set('navigationLayer', navigationLayer);

        return navigationLayer;
    }

    showPagination() {
        let paginationLayer = this.cache.get('paginationLayer');

        if (!paginationLayer) {
            paginationLayer = document.createElement('div');
            this.showNavigation().appendChild(paginationLayer);
        }

        paginationLayer.className = this.constructor.getPaginationLayerClass();

        if (!this.options.showPagination || this.steps.length < 2) {
            paginationLayer.classList.add(this.constructor.getHiddenClass());
        }

        while (paginationLayer.firstChild) {
            paginationLayer.removeChild(paginationLayer.firstChild);
        }

        this.steps.forEach((v, i) => {
            const paginationItem = document.createElement('div');
            paginationItem.className = this.constructor.getPaginationItemClass();

            if (this.step === v) {
                paginationItem.classList.add(this.constructor.getPaginationCurrentItemClass());
            }

            paginationItem.onclick = () => {
                this.go(i, true);
            };

            paginationLayer.appendChild(paginationItem);
        });

        this.cache.set('paginationLayer', paginationLayer);

        return paginationLayer;
    }

    showNavigationPrev() {
        let navigationPrevEl = this.cache.get('navigationPrevEl');

        if (!navigationPrevEl) {
            navigationPrevEl = document.createElement('div');
            this.showNavigation().appendChild(navigationPrevEl);
        }
        navigationPrevEl.onclick = null;
        navigationPrevEl.className = this.constructor.getNavigationPrevClass();

        const stepIndex = this.steps.indexOf(this.step);

        if (stepIndex > -1) {
            if (stepIndex === 0) {
                navigationPrevEl.classList.add(this.constructor.getHiddenClass());
            } else {
                navigationPrevEl.onclick = () => this.go(stepIndex - 1, true);
            }
        }

        this.cache.set('navigationPrevEl', navigationPrevEl);

        return navigationPrevEl;
    }

    showNavigationNext() {
        let navigationNextEl = this.cache.get('navigationNextEl');

        if (!navigationNextEl) {
            navigationNextEl = document.createElement('div');
            this.showNavigation().appendChild(navigationNextEl);
        }

        navigationNextEl.onclick = null;
        navigationNextEl.className = this.constructor.getNavigationNextClass();

        const stepIndex = this.steps.indexOf(this.step);

        if (stepIndex > -1) {
            if ((stepIndex === this.steps.length - 1) || this.steps.length === 1) {
                navigationNextEl.classList.add(this.constructor.getHiddenClass());
            } else {
                navigationNextEl.onclick = () => {
                    this.go(stepIndex + 1, true);
                };
            }
        }

        this.cache.set('navigationNextEl', navigationNextEl);

        return navigationNextEl;
    }

    showCopyright() {
        let copyrightEl = this.cache.get('copyrightEl');

        if (!copyrightEl) {
            copyrightEl = document.createElement('div');
            this.showTooltipLayer().appendChild(copyrightEl);
        }

        copyrightEl.className = this.constructor.getCopyrightClass();

        copyrightEl.innerHTML = 'Made with GuideChimp';

        this.cache.set('copyrightEl', copyrightEl);

        return copyrightEl;
    }

    /**
     * Register an event listener for a tour event.
     *
     * Event names can be comma-separated to register multiple events.
     *
     * @param {string} event The name of the event to listen for.
     * @param {function} listener The event listener, accepts context.
     */
    on(event, listener) {
        const events = event.split(',').map((e) => e.trim());

        events.forEach((e) => {
            this.listeners[e] = this.listeners[e] || [];
            this.listeners[e].push(listener);
        });
    }

    /**
     * Emits an event by name to all registered listeners on that event.
     * Listeners will be called in the order that they were added. If a listener
     * returns `false`, no other listeners will be called.
     *
     * @param {string} event    The name of the event to emit.
     * @param args  The context args of the event, passed to listeners.
     * @returns {Promise}
     */
    emit(event, ...args) {
        const listeners = this.listeners[event];

        if (!listeners) {
            return [];
        }

        // run through each listener
        return Promise.all(listeners.map((f) => Promise.resolve().then(() => f.apply(this, args))));
    }

    /**
     * Set up keydown event listener
     * @return {this}
     */
    setUpOnKeydownListener() {
        this.shutUpOnKeydownListener();

        // turn on keyboard navigation
        this.cache.set('onKeydownListener', this.getOnKeydownListener());
        window.addEventListener('keydown', this.cache.get('onKeydownListener'), true);

        return this;
    }

    /**
     * Return on key down event listener function
     * @returns {function}
     */
    getOnKeydownListener() {
        return (event) => {
            const { keyCode } = event;

            const escCode = 27;
            const arrowLeftCode = 37;
            const arrowRightCode = 39;
            const enterCode = 13;
            const spaceCode = 32;

            // exit key pressed, stop tour
            if (keyCode === escCode) {
                this.stop();
                return;
            }

            // if the left arrow is pressed, go to the previous step
            if (keyCode === arrowLeftCode) {
                this.previous();
                return;
            }

            // if the right arrow, enter or space is pressed, go to the next step
            if (keyCode === arrowRightCode || keyCode === enterCode || keyCode === spaceCode) {
                this.next();
            }
        };
    }

    /**
     * Shut up keydown event listener
     * @return {this}
     */
    shutUpOnKeydownListener() {
        if (this.cache.has('onKeydownListener')) {
            window.removeEventListener('keydown', this.cache.get('onKeydownListener'), true);
            this.cache.delete('onKeydownListener');
        }

        return this;
    }

    /**
     * Set up window resize event listener
     * @return {this}
     */
    setUpOnWindowResizeListener() {
        this.shutUpOnWindowResizeListener();

        // turn on keyboard navigation
        this.cache.set('onWindowResizeListener', this.getOnWindowResizeListener());
        window.addEventListener('resize', this.cache.get('onWindowResizeListener'), true);

        return this;
    }

    /**
     * Return on window resize event listener function
     * @returns {function}
     */
    getOnWindowResizeListener() {
        return () => this.refresh();
    }

    /**
     * Shut up window resize event listener
     * @return {this}
     */
    shutUpOnWindowResizeListener() {
        if (this.cache.has('onWindowResizeListener')) {
            window.removeEventListener('resize', this.cache.get('onWindowResizeListener'), true);
            this.cache.delete('onWindowResizeListener');
        }

        return this;
    }

    /**
     * Refresh layers position
     * @returns {this}
     */
    refresh() {
        if (!this.step) {
            return this;
        }

        const { element, position } = this.step;
        const el = this.getStepElement(element);

        if (this.cache.has('highlightLayer')) {
            this.setHighlightLayerPosition(this.cache.get('highlightLayer'), el);
        }

        if (this.cache.has('controlLayer')) {
            this.setControlLayerPosition(this.cache.get('controlLayer'), el);
        }

        if (this.cache.has('interactionLayer')) {
            this.setInteractionLayerPosition(this.cache.get('interactionLayer'), el);
        }

        if (this.cache.has('tooltipLayer')) {
            this.setTooltipLayerPosition(this.cache.get('tooltipLayer'), el, { position, boundary: window });
        }

        return this;
    }
}
