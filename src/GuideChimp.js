/**
 * Copyright (C) 2020 Labs64
 *
 * This source code is licensed under the EUPL-1.2 license
 * located in the LICENSE file in the project root folder.
 */

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

        this.listeners = [];

        this.cache = new Map();

        this.setOptions(options);
        this.setTour(tour);
    }

    /**
     * Default options
     * @return {Object}
     */
    static getDefaultOptions() {
        return {
            position: 'top',
            useKeyboard: true,
            exitEscape: true,
            exitOverlay: true,
            showPagination: true,
            showProgressbar: true,
            interaction: true,
            padding: 10,
        };
    }

    static getFakeElementClass() {
        return 'gc-fake';
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
        const { width, height, top, left } = el.getBoundingClientRect();
        return { width, height, top: top + scrollTop, left: left + scrollLeft };
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
     * @return {GuideChimp}
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
     * @return {GuideChimp}
     */
    setOptions(options) {
        this.options = { ...options };
        return this;
    }

    /**
     * Get tour options
     */
    getOptions() {
        return { ...this.constructor.getDefaultOptions(), ...this.options };
    }

    /**
     * Start tour
     * @param number step number or it index
     * @param useIndex whether to use step number or index
     * @return {Promise<boolean>}
     */
    async start(number = 0, useIndex = true) {
        // emit start event
        await this.emit('start', this);

        const isStarted = await this.go(number, useIndex);

        if (isStarted) {
            // turn on keyboard navigation
            if (this.getOptions().useKeyboard) {
                window.addEventListener('keydown', this.getOnKeyDownListener(), true);
            }

            // on window resize
            window.addEventListener('resize', this.getOnWindowResizeListener(), true);
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
        const fromStep = { ...this.step };
        let toStep = null;

        if (this.step && this.step.number === number) {
            return false;
        }

        this.steps = [];

        // if tour is empty or is string, looks for steps among the data attributes
        if (!this.tour || typeof this.tour === 'string') {
            const tourStepsEl = document.querySelectorAll(
                (this.tour) ? `[data-guidechimp=${this.tour}]` : '[data-guidechimp]',
            );

            this.steps = Array.from(tourStepsEl).map((el, i) => {
                const stepNumber = parseInt(el.getAttribute('data-guidechimp-number') || i, 10);
                const title = el.getAttribute('data-guidechimp-title');
                const description = el.getAttribute('data-guidechimp-description');
                const position = el.getAttribute('data-guidechimp-position');
                const interaction = (el.getAttribute('data-guidechimp-interaction') !== 'false');

                return { el, number: stepNumber, title, description, position, interaction };
            });
        } else if (Array.isArray(this.tour) && this.tour.length) {
            this.steps = this.tour.map((v, i) => ({ ...v, number: v.number || i }));
        }

        if (!this.steps.length) {
            return false;
        }

        // sort steps by number
        this.steps.sort((a, b) => {
            if (a.number < b.number) {
                return -1;
            }
            if (a.number > b.number) {
                return 1;
            }
            return 0;
        });

        for (let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i];

            if (useIndex && (i === number)) {
                toStep = step;
                break;
            } else if (step.number === number) {
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

        const results = await this.emit('onBeforeChange', this, fromStep, toStep);

        if (results.some((r) => r === false)) {
            return false;
        }

        if (onBeforeChange) {
            if (await Promise.resolve().then(() => onBeforeChange(this, fromStep, toStep)) === false) {
                return false;
            }
        }

        this.stopPreloader();

        this.step = toStep;

        let { el } = this.step;
        const { position, buttons } = this.step;

        if ((!el || (el.style.display === 'none' || el.style.visibility === 'hidden'))) {
            el = this.showFakeElement();
        }

        const highlightLayer = this.showHighlightLayer();
        const controlLayer = this.showControlLayer();
        const interactionLayer = this.showInteractionLayer();

        this.setLayerPosition(highlightLayer, el);
        this.setLayerPosition(controlLayer, el);
        this.setLayerPosition(interactionLayer, el);

        const tooltipLayer = this.showTooltipLayer();
        this.showTooltipTail();
        this.showProgressbar();
        this.showTitle();
        this.showDescription();
        this.showClose();

        this.showCustomButtonsLayer(buttons);

        this.showNavigation();
        this.showNavigationPrev();
        this.showPagination();
        this.showNavigationNext();
        this.showCopyright();

        this.setTooltipLayerPosition(tooltipLayer, el, position);

        this.highlightElement(el);

        this.scrollParentToChildElement(el);
        this.scrollTo(el);

        setTimeout(() => {
            this.scrollTo(tooltipLayer, 'smooth');
        }, 300);

        this.emit('onAfterChange', this, fromStep, toStep);

        if (onAfterChange) {
            onAfterChange(this, fromStep, toStep);
        }

        return true;
    }

    async previous() {
        return (this.step)
            ? this.go((this.steps.indexOf(this.step) - 1), true)
            : false;
    }

    async next() {
        return (this.step)
            ? this.go((this.steps.indexOf(this.step) + 1), true)
            : false;
    }


    async stop() {
        await this.emit('stop', this);

        this.step = null;
        this.steps = [];

        if (this.cache.has('onKeyDownListener')) {
            window.removeEventListener('keydown', this.cache.get('onKeyDownListener'), true);
            this.cache.delete('onKeyDownListener');
        }

        if (this.cache.has('onKeyDownListener')) {
            window.removeEventListener('keydown', this.cache.get('onKeyDownListener'), true);
            this.cache.delete('onKeyDownListener');
        }

        this.removePreloaderElement();
        this.removeOverlayLayer();
        this.removeControlLayer();
        this.removeHighlightLayer();
        this.removeInteractionLayer();
        this.resetElementsHighlighting();
        this.cache.clear();

        return this;
    }

    scrollParentToChildElement(el) {
        const regex = /(auto|scroll)/;

        const getScrollableParent = (parent) => {
            if (!parent || parent === document.body) {
                return document.body;
            }

            const parentStyle = getComputedStyle(parent);

            const isScrollable = regex.test(
                `${parentStyle.getPropertyValue('overflow')}
                ${parentStyle.getPropertyValue('overflow-y')}
                ${parentStyle.getPropertyValue('overflow-x')}`,
            );

            return (isScrollable) ? parent : getScrollableParent(parent.parentElement);
        };

        const elStyle = getComputedStyle(el);

        const scrollableParent = (elStyle.getPropertyValue('position') === 'fixed')
            ? document.body
            : getScrollableParent(el.parentElement);

        // scroll a parent scrollable element to a child element
        if (scrollableParent !== document.body) {
            scrollableParent.scrollTop = el.offsetTop - scrollableParent.offsetTop;
        }

        return this;
    }

    scrollTo(el, behavior = 'auto') {
        const { top, bottom, left, right } = el.getBoundingClientRect();
        const { innerWidth, innerHeight } = window;

        if (!(top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth)) {
            window.scrollBy({ top, behavior });
        }

        return this;
    }


    highlightElement(el) {
        let parentEl = el.parentElement;

        if (el instanceof SVGElement) {
            while (parentEl) {
                if (parentEl === document.body) {
                    break;
                }

                if (parentEl.tagName.toLowerCase() === 'svg') {
                    this.constructor.addElementClass(parentEl, `${this.constructor.getHighlightElementClass()}`);
                    this.constructor.addElementClass(parentEl, this.constructor.getRelativePositionClass());
                }

                parentEl = parentEl.parentElement;
            }
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
        }

        return this;
    }

    resetElementsHighlighting() {
        const highlightEls = (this.cache.has('highlightEls'))
            ? this.cache.get('highlightEls')
            : document.body.querySelectorAll(`.${this.constructor.getHighlightElementClass()}`);

        const highlightElsArray = Array.from(highlightEls);

        if (highlightElsArray.length) {
            highlightEls.forEach((el) => {
                this.resetElementHighlighting(el);
            });
        }

        return this;
    }

    setLayerPosition(layer, el) {
        if (!layer || !el) {
            return this;
        }

        let { padding } = this.getOptions();

        const { width, height, top, left } = this.constructor.getElementOffset(el);

        if (this.constructor.isElementFixed(el)) {
            this.constructor.addElementClass(layer, this.constructor.getFixedClass());
        } else {
            this.constructor.removeElementClass(layer, this.constructor.getFixedClass());
        }

        const elStyle = getComputedStyle(el);

        if (elStyle.getPropertyValue('position') === 'floating') {
            padding = 0;
        }

        const { style: layerStyle } = layer;

        // set new position
        layerStyle.cssText = `width: ${width + padding}px;
        height: ${height + padding}px;
        top: ${top - (padding / 2)}px;
        left: ${left - (padding / 2)}px;`;

        return this;
    }

    setTooltipLayerPosition(tooltipLayer, el, preferredPosition = '') {
        // set tooltip position
        let position = 'floating';
        let alignment = null;

        const isFakeElement = el.classList.contains(this.constructor.getFakeElementClass());

        const {
            top: elTop,
            bottom: elBottom,
            left: elLeft,
            right: elRight,
        } = el.getBoundingClientRect();

        let { width: elWidth, height: elHeight } = el.getBoundingClientRect();

        elWidth += this.getOptions().padding;
        elHeight += this.getOptions().padding;

        const { width: tooltipWidth, height: tooltipHeight } = tooltipLayer.getBoundingClientRect();

        const { style } = tooltipLayer;

        // reset tooltip styles
        style.top = null;
        style.right = null;
        style.bottom = null;
        style.left = null;
        style.marginLeft = null;
        style.marginTop = null;

        if (!isFakeElement) {
            const positionPriority = ['top', 'bottom', 'right', 'left'];

            if (elTop - tooltipHeight < 0) {
                positionPriority.splice(positionPriority.indexOf('top'), 1);
            }

            if (elBottom + tooltipHeight > window.innerHeight) {
                positionPriority.splice(positionPriority.indexOf('bottom'), 1);
            }

            if (elRight + tooltipWidth > window.innerWidth) {
                positionPriority.splice(positionPriority.indexOf('right'), 1);
            }

            if (elLeft - tooltipWidth < 0) {
                positionPriority.splice(positionPriority.indexOf('left'), 1);
            }

            // eslint-disable-next-line prefer-destructuring
            position = positionPriority[0];

            if (positionPriority.length) {
                if (positionPriority.includes(this.getOptions().position)) {
                    position = this.getOptions().position;
                }

                if (positionPriority.includes(preferredPosition)) {
                    position = preferredPosition;
                }
            }
        }

        if (position === 'top' || position === 'bottom') {
            const availableAlignments = ['left', 'right', 'middle'];
            const minWindowSize = Math.min(window.innerWidth, window.screen.width);

            // valid left space must be at least tooltip width
            if (minWindowSize - elLeft < tooltipWidth) {
                availableAlignments.splice(availableAlignments.indexOf('left'), 1);
            }

            // valid middle space must be at least half width from both sides
            if (elLeft < (tooltipWidth / 2) || minWindowSize - elLeft < (tooltipWidth / 2)) {
                availableAlignments.splice(availableAlignments.indexOf('middle'), 1);
            }

            // valid right space must be at least tooltip width
            if (elLeft < tooltipWidth) {
                availableAlignments.splice(availableAlignments.indexOf('right'), 1);
            }

            alignment = (availableAlignments.length) ? availableAlignments[0] : 'middle';
        }

        tooltipLayer.removeAttribute('gc-position');
        tooltipLayer.removeAttribute('gc-alignment');

        tooltipLayer.setAttribute('gc-position', position);

        if (alignment) {
            tooltipLayer.setAttribute('gc-alignment', alignment);
        }

        switch (position) {
            case 'top':
                style.bottom = `${elHeight}px`;
                break;
            case 'right':
                style.left = `${elWidth}px`;
                break;
            case 'left':
                style.right = `${elWidth}px`;
                break;
            case 'bottom':
                style.top = `${elHeight}px`;
                break;
            default: {
                style.left = '50%';
                style.top = '50%';
                style.marginLeft = `-${tooltipWidth / 2}px`;
                style.marginTop = `-${tooltipHeight / 2}px`;
            }
        }

        if (alignment === 'right') {
            style.left = `${elWidth - tooltipWidth}px`;
        } else if (alignment === 'middle') {
            style.left = `${(elWidth / 2) - (tooltipWidth / 2)}px`;
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

    showFakeElement() {
        let fakeEl = this.cache.get('fakeEl');

        if (!fakeEl) {
            fakeEl = document.createElement('div');
            document.body.appendChild(fakeEl);
        }

        fakeEl.className = this.constructor.getFakeElementClass();

        this.cache.set('fakeEl', fakeEl);

        return fakeEl;
    }

    showPreloaderElement() {
        let preloaderEl = (this.cache.has('preloaderEl'))
            ? this.cache.get('preloaderEl')
            : document.querySelector(`.${this.constructor.getPreloaderClass()}`);

        if (!preloaderEl) {
            preloaderEl = document.createElement('div');
            preloaderEl.className = this.constructor.getPreloaderClass();
            document.body.appendChild(preloaderEl);
        }

        this.cache.set('preloaderEl', preloaderEl);

        return preloaderEl;
    }

    removePreloaderElement() {
        const overlayLayer = (this.cache.has('preloaderEl'))
            ? this.cache.get('preloaderEl')
            : document.querySelector(`.${this.constructor.getPreloaderClass()}`);

        if (overlayLayer) {
            overlayLayer.parentElement.removeChild(overlayLayer);
        }

        this.cache.delete('preloaderEl');

        return this;
    }

    showOverlayLayer() {
        let overlayLayer = (this.cache.has('overlayLayer'))
            ? this.cache.get('overlayLayer')
            : document.querySelector(`.${this.constructor.getOverlayLayerClass()}`);

        if (!overlayLayer) {
            overlayLayer = document.createElement('div');
            overlayLayer.className = this.constructor.getOverlayLayerClass();
            overlayLayer.onclick = (this.getOptions().exitOverlay) ? () => this.stop() : null;
            document.body.appendChild(overlayLayer);
        }

        this.cache.set('overlayLayer', overlayLayer);

        return overlayLayer;
    }

    removeOverlayLayer() {
        const overlayLayer = (this.cache.has('overlayLayer'))
            ? this.cache.get('overlayLayer')
            : document.querySelector(`.${this.constructor.getOverlayLayerClass()}`);

        if (overlayLayer) {
            overlayLayer.parentElement.removeChild(overlayLayer);
        }

        this.cache.delete('overlayLayer');

        return this;
    }

    showHighlightLayer() {
        let highlightLayer = (this.cache.has('highlightLayer'))
            ? this.cache.get('highlightLayer')
            : document.querySelector(`.${this.constructor.getHighlightLayerClass()}`);

        if (!highlightLayer) {
            highlightLayer = document.createElement('div');
            highlightLayer.className = this.constructor.getHighlightLayerClass();
            document.body.appendChild(highlightLayer);
        }

        this.cache.set('highlightLayer', highlightLayer);

        return highlightLayer;
    }

    removeHighlightLayer() {
        const highlightLayer = (this.cache.has('highlightLayer'))
            ? this.cache.get('highlightLayer')
            : document.querySelector(`.${this.constructor.getHighlightLayerClass()}`);

        if (highlightLayer) {
            highlightLayer.parentElement.removeChild(highlightLayer);
        }

        this.cache.delete('highlightLayer');

        return this;
    }

    showControlLayer() {
        let controlLayer = (this.cache.has('controlLayer'))
            ? this.cache.get('controlLayer')
            : document.querySelector(`.${this.constructor.getControlLayerClass()}`);

        if (!controlLayer) {
            controlLayer = document.createElement('div');
            controlLayer.className = this.constructor.getControlLayerClass();
            document.body.appendChild(controlLayer);
        }

        this.cache.set('controlLayer', controlLayer);

        return controlLayer;
    }

    removeControlLayer() {
        const controlLayer = (this.cache.has('controlLayer'))
            ? this.cache.get('controlLayer')
            : document.querySelector(`.${this.constructor.getControlLayerClass()}`);

        if (controlLayer) {
            controlLayer.parentElement.removeChild(controlLayer);
        }

        this.cache.delete('controlLayer');

        return this;
    }

    showInteractionLayer() {
        // get or create interaction layer
        let interactionLayer = (this.cache.has('interactionLayer'))
            ? this.cache.get('interactionLayer')
            : document.querySelector(`.${this.constructor.getInteractionLayerClass()}`);

        if (!interactionLayer) {
            interactionLayer = document.createElement('div');
            document.body.appendChild(interactionLayer);
        }

        interactionLayer.className = this.constructor.getInteractionLayerClass();

        let { interaction } = this.getOptions();

        if (this.step) {
            interaction = this.step.interaction || interaction;
        }

        // disable interaction
        if (!interaction) {
            interactionLayer.classList.add(this.constructor.getDisableInteractionClass());
        }

        this.cache.set('interactionLayer', interactionLayer);

        return interactionLayer;
    }

    removeInteractionLayer() {
        const interactionLayer = (this.cache.has('interactionLayer'))
            ? this.cache.get('interactionLayer')
            : document.querySelector(`.${this.constructor.getInteractionLayerClass()}`);

        if (interactionLayer) {
            interactionLayer.parentElement.removeChild(interactionLayer);
        }

        this.cache.delete('interactionLayer');

        return this;
    }

    showTooltipLayer() {
        const parent = this.showControlLayer();

        let tooltipLayer = (this.cache.has('tooltipLayer'))
            ? this.cache.get('tooltipLayer')
            : parent.querySelector(`.${this.constructor.getTooltipLayerClass()}`);

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

        let tooltipTailEl = (this.cache.has('tooltipTailEl'))
            ? this.cache.get('tooltipTailEl')
            : parent.querySelector(`.${this.constructor.getTooltipTailClass()}`);


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

        let closeEl = (this.cache.has('closeEl'))
            ? this.cache.get('closeEl')
            : parent.querySelector(`.${this.constructor.getCloseClass()}`);

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

        let progressbarEl = (this.cache.has('progressbarEl'))
            ? this.cache.get('progressbarEl')
            : parent.querySelector(`.${this.constructor.getProgressbarClass()}`);

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

        if (!this.getOptions().showProgressbar) {
            progressbarEl.classList.add(this.constructor.getHiddenClass());
        }

        this.cache.set('progressbarEl', progressbarEl);

        return progressbarEl;
    }

    showTitle() {
        const parent = this.showTooltipLayer();

        let titleEl = (this.cache.has('titleEl'))
            ? this.cache.get('titleEl')
            : parent.querySelector(`.${this.constructor.getTitleClass()}`);

        if (!titleEl) {
            titleEl = document.createElement('div');
            parent.appendChild(titleEl);
        }

        titleEl.className = this.constructor.getTitleClass();

        const { title } = this.step || {};

        if (!title) {
            titleEl.classList.add(this.constructor.getHiddenClass());
        }

        titleEl.innerHTML = title || '';

        this.cache.set('titleEl', titleEl);

        return titleEl;
    }

    showDescription() {
        const parent = this.showTooltipLayer();

        let descriptionEl = (this.cache.has('descriptionEl'))
            ? this.cache.get('descriptionEl')
            : parent.querySelector(`.${this.constructor.getDescriptionClass()}`);

        if (!descriptionEl) {
            descriptionEl = document.createElement('div');
            parent.appendChild(descriptionEl);
        }

        descriptionEl.className = this.constructor.getDescriptionClass();

        const { description } = this.step || {};

        if (!description) {
            descriptionEl.classList.add(this.constructor.getHiddenClass());
        }

        descriptionEl.innerHTML = description || '';

        this.cache.set('descriptionEl', descriptionEl);

        return descriptionEl;
    }

    showCustomButtonsLayer(buttons = []) {
        const parent = this.showTooltipLayer();

        let customButtonsLayer = (this.cache.has('customButtonsLayer'))
            ? this.cache.get('customButtonsLayer')
            : parent.querySelector(`.${this.constructor.getCustomButtonsLayerClass()}`);

        if (!customButtonsLayer) {
            customButtonsLayer = document.createElement('div');
            parent.appendChild(customButtonsLayer);
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
                const { tag = 'button', title = '', class: className = '', click = null } = v;
                const customButton = document.createElement(tag);

                customButton.innerHTML = title;
                customButton.className = className;
                customButton.onclick = click;

                customButtonsLayer.appendChild(customButton);
            }
        });


        this.cache.set('customButtonsLayer', customButtonsLayer);

        return customButtonsLayer;
    }

    showNavigation() {
        const parent = this.showTooltipLayer();

        let navigationLayer = (this.cache.has('navigationLayer'))
            ? this.cache.get('navigationLayer')
            : parent.querySelector(`.${this.constructor.getNavigationClass()}`);

        if (!navigationLayer) {
            navigationLayer = document.createElement('div');
            parent.appendChild(navigationLayer);
        }

        navigationLayer.className = this.constructor.getNavigationClass();

        this.cache.set('navigationLayer', navigationLayer);

        return navigationLayer;
    }

    showPagination() {
        const parent = this.showNavigation();

        let paginationLayer = (this.cache.has('paginationLayer'))
            ? this.cache.get('paginationLayer')
            : parent.querySelector(`.${this.constructor.getPaginationLayerClass()}`);

        if (!paginationLayer) {
            paginationLayer = document.createElement('div');
            parent.appendChild(paginationLayer);
        }

        paginationLayer.className = this.constructor.getPaginationLayerClass();

        if (!this.getOptions().showPagination || this.steps.length < 2) {
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
        const parent = this.showNavigation();

        let navigationPrevEl = (this.cache.has('navigationPrevEl'))
            ? this.cache.get('navigationPrevEl')
            : parent.querySelector(`.${this.constructor.getNavigationPrevClass()}`);

        if (!navigationPrevEl) {
            navigationPrevEl = document.createElement('div');
            parent.appendChild(navigationPrevEl);
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
        const parent = this.showNavigation();

        let navigationNextEl = (this.cache.has('navigationNextEl'))
            ? this.cache.get('navigationNextEl')
            : parent.querySelector(`.${this.constructor.getNavigationNextClass()}`);

        if (!navigationNextEl) {
            navigationNextEl = document.createElement('div');
            parent.appendChild(navigationNextEl);
        }

        navigationNextEl.onclick = null;
        navigationNextEl.className = this.constructor.getNavigationNextClass();

        const stepIndex = this.steps.indexOf(this.step);

        if (stepIndex > -1) {
            if ((stepIndex === this.steps.length - 1) || this.steps.length === 1) {
                navigationNextEl.classList.add(this.constructor.getHiddenClass());
            } else {
                navigationNextEl.onclick = () => this.go(stepIndex + 1, true);
            }
        }

        this.cache.set('navigationNextEl', navigationNextEl);

        return navigationNextEl;
    }

    showCopyright() {
        const parent = this.showTooltipLayer();

        let copyrightEl = (this.cache.has('copyrightEl'))
            ? this.cache.get('copyrightEl')
            : parent.querySelector(`.${this.constructor.getCopyrightClass()}`);

        if (!copyrightEl) {
            copyrightEl = document.createElement('div');
            parent.appendChild(copyrightEl);
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
        return Promise.all(listeners.map((f) => Promise.resolve().then(() => f(...args))));
    }

    /**
     * Return on key down event listener function
     * @returns {function}
     */
    getOnKeyDownListener() {
        const onKeyDown = this.cache.has('onKeyDownListener')
            ? this.cache.get('onKeyDownListener')
            : (event) => {
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

        this.cache.set('onKeyDownListener', onKeyDown);

        return onKeyDown;
    }

    /**
     * Return on window resize event listener function
     * @returns {function}
     */
    getOnWindowResizeListener() {
        const onWindowResize = this.cache.has('onWindowResizeListener')
            ? this.cache.get('onWindowResizeListener')
            : () => this.refresh();

        // save listener to cache
        this.cache.set('onWindowResizeListener', onWindowResize);

        return onWindowResize;
    }

    /**
     * Refresh layers position
     * @returns {this}
     */
    refresh() {
        if (!this.step) {
            return this;
        }

        const highlightLayer = this.cache.has('highlightLayer')
            ? this.cache.get('highlightLayer')
            : document.body.querySelector(`.${this.constructor.getHighlightLayerClass()}`);

        if (highlightLayer) {
            this.setLayerPosition(highlightLayer, this.step.el);
        }

        const controlLayer = this.cache.has('controlLayer')
            ? this.cache.get('controlLayer')
            : document.body.querySelector(`.${this.constructor.getControlLayerClass()}`);

        if (controlLayer) {
            this.setLayerPosition(controlLayer, this.step.el);
        }

        const interactionLayer = this.cache.has('interactionLayer')
            ? this.cache.get('interactionLayer')
            : document.body.querySelector(`.${this.constructor.getInteractionLayerClass()}`);

        if (interactionLayer) {
            this.setLayerPosition(interactionLayer, this.step.el);
        }

        const tooltipLayer = this.cache.has('tooltipLayer')
            ? this.cache.get('tooltipLayer')
            : document.body.querySelector(`.${this.constructor.getTooltipLayerClass()}`);

        if (tooltipLayer) {
            this.setTooltipLayerPosition(tooltipLayer, this.step.el, this.step.position);
        }

        return this;
    }
}
