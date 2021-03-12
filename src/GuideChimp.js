/* eslint-disable class-methods-use-this */
/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the European Union Public License, version 1.2
 * located in the LICENSE file
 */

export default class GuideChimp {
    /**
     * GuideChimp constructor
     * @param tour
     * @param options
     */
    constructor(tour, options = {}) {
        this.setDefaults();

        this.cache = new Map();

        this.listeners = {};

        this.observers = {};

        this.options = {};
        this.setOptions(options);

        this.tour = null;
        this.setTour(tour);

        this.notifications = [];

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
            scrollBehavior: 'auto',
        };
    }

    static getDefaultKeyboardCodes() {
        const escCode = 27;
        const arrowLeftCode = 37;
        const arrowRightCode = 39;
        const enterCode = 13;
        const spaceCode = 32;

        return {
            previous: [arrowLeftCode],
            next: [arrowRightCode, enterCode, spaceCode],
            stop: [escCode],
        };
    }

    static getEventListenersPriorities() {
        return ['low', 'medium', 'high', 'critical'];
    }

    static getBodyClass() {
        return 'gc';
    }

    static getDefaultElementClass() {
        return 'gc-default';
    }

    static getFixStackingContextClass() {
        return 'gc-fix-stacking-context';
    }

    static getHighlightedClass() {
        return 'gc-highlighted';
    }

    static getLoadingClass() {
        return 'gc-loading';
    }

    static getPreloaderClass() {
        return 'gc-preloader';
    }

    static getOverlayClass() {
        return 'gc-overlay';
    }

    static getFixedClass() {
        return 'gc-fixed';
    }

    static getHighlightClass() {
        return 'gc-highlight';
    }

    static getControlClass() {
        return 'gc-control';
    }

    static getInteractionClass() {
        return 'gc-interaction';
    }

    static getTooltipClass() {
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

    static getCustomButtonsClass() {
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

    static getPaginationClass() {
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

    static getNotificationClass() {
        return 'gc-notification';
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
    static getOffset(el) {
        const { body, documentElement, defaultView: view } = el.ownerDocument;
        const scrollTop = view.pageYOffset || documentElement.scrollTop || body.scrollTop;
        const scrollLeft = view.pageXOffset || documentElement.scrollLeft || body.scrollLeft;
        const { top, right, bottom, left, width, height, x, y } = el.getBoundingClientRect();
        return { right, bottom, width, height, x, y, top: top + scrollTop, left: left + scrollLeft };
    }

    /**
     * Check if el or his parent has fixed position
     * @param el
     * @return {boolean}
     */
    static isFixed(el) {
        const { parentNode } = el;

        if (!parentNode || parentNode.nodeName === 'HTML') {
            return false;
        }

        const elStyle = getComputedStyle(el);

        if (elStyle.getPropertyValue('position') === 'fixed') {
            return true;
        }

        return this.isFixed(parentNode);
    }

    /**
     * Add class to el
     * @param el
     * @param className
     */
    static addClass(el, className) {
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
    static removeClass(el, className) {
        if (el instanceof SVGElement) {
            const classes = el.getAttribute('class') || '';
            classes.replace(className, '');

            el.setAttribute('class', classes);
            return;
        }

        el.classList.remove(className);
    }

    setDefaults() {
        this.previousStep = null;
        this.currentStep = null;
        this.nextStep = null;
        this.fromStep = null;
        this.toStep = null;

        this.previousStepIndex = -1;
        this.currentStepIndex = -1;
        this.nextStepIndex = -1;
        this.fromStepIndex = -1;
        this.toStepIndex = -1;

        this.steps = [];

        return this;
    }

    /**
     * Set tour name or steps
     * @param tour
     * @return {this}
     */
    setTour(tour) {
        this.tour = tour;
        return this;
    }

    /**
     * Get tour name or steps
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
        this.mountOverlayLayer();
        this.startPreloader();

        // emit start event
        await this.emit('onStart');

        this.stopPreloader();
        this.removeOverlayLayer();

        if (!this.tour || !this.tour.length) {
            return false;
        }

        this.steps = this.sortSteps(this.getSteps(this.tour));

        if (!this.steps.length) {
            return false;
        }

        // add a class that increase the specificity of the classes
        document.body.classList.add(this.constructor.getBodyClass());

        const isStarted = await this.go(number, useIndex);

        document.body.classList.toggle(this.constructor.getBodyClass(), isStarted);

        if (isStarted) {
            // turn on keyboard navigation
            if (this.options.useKeyboard) {
                this.addOnKeydownListener();
            }

            // on window resize
            this.addOnWindowResizeListener();
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
        if (!this.steps.length) {
            return false;
        }

        const stepNumber = (useIndex) ? parseInt(number, 10) : number;

        if (this.currentStep) {
            // skip if this step is already displayed
            const isSameStep = (useIndex)
                ? (this.currentStepIndex === stepNumber)
                : (this.currentStep.step === stepNumber);

            if (isSameStep) {
                return false;
            }
        }

        const fromStep = this.currentStep;
        const fromStepIndex = this.currentStepIndex;

        const currentStep = (useIndex)
            ? this.steps[stepNumber]
            : this.steps.filter(({ step }) => step === stepNumber)[0];

        if (!currentStep) {
            return false;
        }

        const currentStepIndex = this.steps.indexOf(currentStep);

        const toStep = currentStep;
        const toStepIndex = currentStepIndex;

        const { onBeforeChange, onAfterChange } = toStep;

        this.mountOverlayLayer();
        this.startPreloader();

        if (onBeforeChange) {
            if (await Promise.resolve().then(() => onBeforeChange.call(this, toStep, fromStep)) === false) {
                this.stopPreloader();
                return false;
            }
        }

        if ((await this.emit('onBeforeChange', toStep, fromStep)).some((r) => r === false)) {
            this.stopPreloader();
            return false;
        }

        this.stopPreloader();

        this.cleanupAfterPreviousStep();

        this.toStep = toStep;
        this.toStepIndex = toStepIndex;

        this.currentStep = currentStep;
        this.currentStepIndex = currentStepIndex;

        this.fromStep = fromStep;
        this.fromStepIndex = fromStepIndex;

        this.previousStep = this.steps[this.currentStepIndex - 1] || null;
        this.previousStepIndex = (this.previousStep) ? this.currentStepIndex - 1 : -1;

        this.nextStep = this.steps[this.currentStepIndex + 1] || null;
        this.nextStepIndex = (this.nextStep) ? this.currentStepIndex + 1 : -1;

        const { scrollBehavior } = this.options;
        const { scrollPadding = this.options.scrollPadding } = this.currentStep;

        // get step element
        const el = this.getStepElement(this.currentStep, true);

        // scroll to element
        this.scrollParentsToStepElement();
        this.scrollTo(el, scrollBehavior, scrollPadding);

        this.mountStepTemplate();

        this.highlightStepElement();

        // observers
        this.observeStep();

        setTimeout(() => {
            if (this.findTooltipElement()) {
                this.scrollTo(this.findTooltipElement(), scrollBehavior, scrollPadding);
            }
        }, 300);

        if (onAfterChange) {
            onAfterChange.call(this, this.toStep, this.fromStep);
        }

        this.emit('onAfterChange', this.toStep, this.fromStep);

        return true;
    }

    async previous() {
        if (!this.currentStep || !this.previousStep) {
            return false;
        }

        const { onPrevious } = this.currentStep;

        this.startPreloader();

        if (onPrevious) {
            if (await Promise.resolve()
                .then(() => onPrevious.call(this, this.previousStep, this.currentStep)) === false) {
                this.stopPreloader();
                return false;
            }
        }

        if ((await this.emit('onPrevious', this.previousStep, this.currentStep)).some((r) => r === false)) {
            this.stopPreloader();
            return false;
        }

        this.stopPreloader();

        return this.go(this.previousStepIndex, true);
    }

    async next() {
        if (!this.currentStep || !this.nextStep) {
            return false;
        }

        const { onNext } = this.currentStep;

        this.startPreloader();

        if (onNext) {
            if (await Promise.resolve().then(() => onNext.call(this, this.nextStep, this.currentStep)) === false) {
                this.stopPreloader();
                return false;
            }
        }

        if ((await this.emit('onNext', this.nextStep, this.currentStep)).some((r) => r === false)) {
            this.stopPreloader();
            return false;
        }

        this.stopPreloader();

        return this.go(this.nextStepIndex, true);
    }

    async stop() {
        if (this.currentStepIndex === this.steps.length - 1) {
            this.startPreloader();
            await this.emit('onComplete');
            this.stopPreloader();
        }

        this.startPreloader();

        // emit stop event
        await this.emit('onStop');

        this.stopPreloader();

        // remove the class that increase the specificity of the classes
        document.body.classList.remove(this.constructor.getBodyClass());

        // remove all highlighting
        this.resetHighlightingAll();

        // remove events listeners
        this.removeListeners();

        // disconnect observers
        this.unobserve();

        // remove all layers and keys
        this.removeStepTemplate();

        // clean cache
        this.cache.clear();

        // set step variables to defaults
        this.setDefaults();

        return this;
    }

    getSteps(tour) {
        if (!tour || !tour.length) {
            return [];
        }

        return (typeof tour === 'string')
            ? this.getDataSteps(tour)
            : this.getJsSteps(tour);
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

    getStepElement(step, force = false) {
        const { element } = step || {};

        if (!element) {
            return this.mountDefaultElement();
        }

        // check cache
        const elsCache = this.cache.get('els') || new Map();

        let el = (elsCache.has(element) && !force)
            ? elsCache.get(element)
            : this.getElement(element, null);

        if (!el || el.style.display === 'none' || el.style.visibility === 'hidden') {
            el = this.mountDefaultElement();
        }

        elsCache.set(element, el);
        this.cache.set('els', elsCache);

        return el;
    }

    getElement(selector, def = null) {
        const el = (typeof selector === 'string')
            ? document.querySelector(selector)
            : selector;

        return el || def;
    }

    getScrollableParentsElements(el) {
        const parents = [];
        let htmlEl = el;

        while (htmlEl && htmlEl !== htmlEl.ownerDocument.body) {
            htmlEl = this.getScrollableParentElement(htmlEl);
            parents.push(htmlEl);
        }

        return parents;
    }

    getScrollableParentElement(el) {
        const regex = /(auto|scroll)/;
        const elStyle = getComputedStyle(el);
        const elDocument = el.ownerDocument;

        const getClosestScrollableParent = (parent) => {
            if (!parent || parent === elDocument.body) {
                return elDocument.body;
            }

            const parentStyle = getComputedStyle(parent);

            if (elStyle.getPropertyValue('position') === 'fixed'
                && parentStyle.getPropertyValue('position') === 'static') {
                return getClosestScrollableParent(parent.parentElement);
            }

            const overflowX = parentStyle.getPropertyValue('overflow-x');
            const overflowY = parentStyle.getPropertyValue('overflow-y');

            if (regex.test(overflowX) || regex.test(overflowY)) {
                return parent;
            }

            return getClosestScrollableParent(parent.parentElement);
        };

        return (elStyle.getPropertyValue('position') === 'fixed')
            ? elDocument.body
            : getClosestScrollableParent(el.parentElement);
    }

    scrollParentsToStepElement() {
        const { scrollPadding = this.options.scrollPadding } = this.currentStep;
        return this.scrollParentsToElement(this.getStepElement(this.currentStep), scrollPadding);
    }

    scrollParentsToElement(el, scrollPadding = 0) {
        // get all scrollable parents
        const parents = this.getScrollableParentsElements(el);

        parents.forEach((parent) => {
            if (parent !== document.body) {
                // eslint-disable-next-line no-param-reassign
                parent.scrollTop = el.offsetTop - parent.offsetTop - scrollPadding;
                // eslint-disable-next-line no-param-reassign
                parent.scrollLeft = el.offsetLeft - parent.offsetLeft - scrollPadding;
            }
        });

        return this;
    }

    scrollTo(el, behavior = 'auto', scrollPadding = 0) {
        const { top, bottom, left, right } = el.getBoundingClientRect();
        const { innerWidth, innerHeight } = window;

        if (!(left >= 0 && right <= innerWidth)) {
            window.scrollBy({ behavior, left: left - scrollPadding });
        }

        if (!(top >= 0 && bottom <= innerHeight)) {
            window.scrollBy({ behavior, top: top - scrollPadding });
        }

        return this;
    }

    highlightStepElement() {
        return this.highlightElement(this.getStepElement(this.currentStep));
    }

    highlightElement(el) {
        let parentEl = el.parentElement;

        while (parentEl) {
            if (parentEl === el.ownerDocument.body) {
                break;
            }

            if (el instanceof SVGElement && parentEl.tagName.toLowerCase() === 'svg') {
                this.constructor.addClass(parentEl, `${this.constructor.getHighlightedClass()}`);
                this.constructor.addClass(parentEl, this.constructor.getRelativePositionClass());
            }

            const parentElStyle = getComputedStyle(parentEl);

            const zIndex = parentElStyle.getPropertyValue('z-index');
            const opacity = parentElStyle.getPropertyValue('opacity');
            const transform = parentElStyle.getPropertyValue('transform');

            if (/[0-9]+/.test(zIndex) || opacity < 1 || (transform && transform !== 'none')) {
                this.constructor.addClass(parentEl, this.constructor.getFixStackingContextClass());
            }

            parentEl = parentEl.parentElement;
        }

        this.constructor.addClass(el, this.constructor.getHighlightedClass());

        const elStyle = getComputedStyle(el);

        if (!['absolute', 'relative', 'fixed'].includes(elStyle.getPropertyValue('position'))) {
            this.constructor.addClass(el, this.constructor.getRelativePositionClass());
        }

        const highlightElements = this.cache.get('highlightElements') || new Set();

        highlightElements.add(el);

        this.cache.set('highlightElements', highlightElements);

        return this;
    }

    resetHighlighting(el) {
        if (el) {
            const els = this.cache.get('highlightElements');

            if (els) {
                els.delete(el);
            }

            el.classList.remove(this.constructor.getHighlightedClass());
            el.classList.remove(this.constructor.getRelativePositionClass());

            let parentEl = el.parentElement;

            while (parentEl) {
                if (parentEl === document.body) {
                    break;
                }

                parentEl.classList.remove(this.constructor.getFixStackingContextClass());
                parentEl = parentEl.parentElement;
            }
        }

        return this;
    }

    resetHighlightingAll() {
        let els = this.cache.get('highlightElements');

        if (els) {
            els = Array.from(els);
            if (els.length) {
                els.forEach((el) => {
                    this.resetHighlighting(el);
                });
            }
        }

        return this;
    }

    setLayerPosition(layer) {
        const el = this.getStepElement(this.currentStep);

        if (!layer || !el) {
            return this;
        }

        let { padding } = this.options;

        const elStyle = getComputedStyle(el);

        if (elStyle.getPropertyValue('position') === 'floating') {
            padding = 0;
        }

        const { width, height, top, left } = this.constructor.getOffset(el);

        if (this.constructor.isFixed(el)) {
            this.constructor.addClass(layer, this.constructor.getFixedClass());
        } else {
            this.constructor.removeClass(layer, this.constructor.getFixedClass());
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

    setControlLayerPosition(layer) {
        const el = this.getStepElement(this.currentStep);

        if (!layer || !el) {
            return this;
        }

        let { padding } = this.options;

        const elStyle = getComputedStyle(el);

        if (elStyle.getPropertyValue('position') === 'floating') {
            padding = 0;
        }

        const { pageXOffset } = el.ownerDocument.defaultView;
        const { width: docElWidth } = el.ownerDocument.documentElement.getBoundingClientRect();
        const { height: elHeight, top: elTop, left: elLeft, right: elRight } = this.constructor.getOffset(el);

        const height = elHeight + padding;
        const top = elTop - (padding / 2);
        const left = (pageXOffset < pageXOffset + (elLeft - (padding / 2))) ? pageXOffset : (elLeft - (padding / 2));
        const width = (pageXOffset + docElWidth > pageXOffset + (elRight + (padding / 2)))
            ? docElWidth
            : (elRight + (padding / 2));

        if (this.constructor.isFixed(el)) {
            this.constructor.addClass(layer, this.constructor.getFixedClass());
        } else {
            this.constructor.removeClass(layer, this.constructor.getFixedClass());
        }

        const { style: layerStyle } = layer;

        // set new position
        layerStyle.cssText = `width: ${width}px;
        height: ${height}px;
        top: ${top}px;
        left: ${left}px;`;

        return this;
    }

    setTooltipElementPosition(layer, options = {}) {
        if (!this.currentStep) {
            return this;
        }

        const el = this.getStepElement(this.currentStep);

        if (!layer || !el) {
            return this;
        }

        let { boundary, position } = options;
        let { padding } = this.options;

        boundary = boundary || window;

        position = position || this.currentStep.position;
        position = position || this.options.position;

        let alignment = null;

        const elStyle = getComputedStyle(el);

        if (elStyle.getPropertyValue('position') === 'floating') {
            padding = 0;
        }

        const { style: tooltipStyle } = layer;

        // reset tooltip styles
        tooltipStyle.top = null;
        tooltipStyle.right = null;
        tooltipStyle.bottom = null;
        tooltipStyle.left = null;
        tooltipStyle.transform = null;

        const {
            top: elTop,
            bottom: elBottom,
            left: elLeft,
            right: elRight,
            width: elWidth,
            height: elHeight,
        } = el.getBoundingClientRect();

        const { height: tooltipHeight, width: tooltipWith } = layer.getBoundingClientRect();

        // find out min tooltip width
        const cloneTooltip = layer.cloneNode();
        cloneTooltip.style.visibility = 'hidden';
        cloneTooltip.innerHTML = '';

        layer.parentElement.appendChild(cloneTooltip);

        const { width: minTooltipWidth } = cloneTooltip.getBoundingClientRect();

        cloneTooltip.parentElement.removeChild(cloneTooltip);

        let boundaryRect = new DOMRect(0, 0, window.innerWidth, window.innerHeight);

        if (!(boundary instanceof Window)) {
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
        if (el.classList.contains(this.constructor.getDefaultElementClass())) {
            position = 'floating';
        } else {
            // calculate position
            const positions = ['bottom', 'right', 'left', 'top'];

            let {
                marginTop: tooltipMarginTop,
                marginLeft: tooltipMarginLeft,
                marginRight: tooltipMarginRight,
                marginBottom: tooltipMarginBottom,
            } = getComputedStyle(layer);

            tooltipMarginTop = parseInt(tooltipMarginTop, 10);
            tooltipMarginLeft = parseInt(tooltipMarginLeft, 10);
            tooltipMarginRight = parseInt(tooltipMarginRight, 10);
            tooltipMarginBottom = parseInt(tooltipMarginBottom, 10);

            // check if the tooltip can be placed on top
            if (tooltipHeight + tooltipMarginTop + tooltipMarginBottom > (elTop - boundaryTop)) {
                positions.splice(positions.indexOf('top'), 1);
            }

            // check if the tooltip can be placed on bottom
            if (tooltipHeight + tooltipMarginTop + tooltipMarginBottom > boundaryBottom - elBottom) {
                positions.splice(positions.indexOf('bottom'), 1);
            }

            // check if the tooltip can be placed on left
            if (minTooltipWidth + tooltipMarginLeft + tooltipMarginRight > elLeft - boundaryLeft) {
                positions.splice(positions.indexOf('left'), 1);
            }

            // check if the tooltip can be placed on right
            if (minTooltipWidth + tooltipMarginLeft + tooltipMarginRight > boundaryRight - elRight) {
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

        layer.setAttribute('data-guidechimp-position', position);

        switch (position) {
            case 'top':
                tooltipStyle.bottom = `${elHeight + padding}px`;
                break;
            case 'right':
                tooltipStyle.left = `${(elRight + (padding / 2)) - root.clientLeft}px`;
                break;
            case 'left':
                tooltipStyle.right = `${root.clientWidth - (elLeft - (padding / 2))}px`;
                break;
            case 'bottom':
                tooltipStyle.top = `${elHeight + padding}px`;
                break;
            default: {
                tooltipStyle.left = '50%';
                tooltipStyle.top = '50%';
                tooltipStyle.transform = 'translate(-50%,-50%)';
            }
        }

        layer.removeAttribute('data-guidechimp-alignment');

        if (alignment) {
            layer.setAttribute('data-guidechimp-alignment', alignment);

            switch (alignment) {
                case 'left': {
                    tooltipStyle.left = `${elLeft - (padding / 2)}px`;
                    break;
                }
                case 'right': {
                    tooltipStyle.right = `${root.clientWidth - elRight - (padding / 2)}px`;
                    break;
                }
                default: {
                    if ((elLeft + (elWidth / 2)) < (tooltipWith / 2)
                        || (elLeft + (elWidth / 2) + (tooltipWith / 2)) > root.clientWidth) {
                        tooltipStyle.left = `${((root.clientWidth) / 2) - (tooltipWith / 2)}px`;
                    } else {
                        tooltipStyle.left = `${elLeft + (elWidth / 2) - (tooltipWith / 2)}px`;
                    }
                }
            }
        }

        return this;
    }

    startPreloader() {
        document.body.classList.add(this.constructor.getLoadingClass());
        const preloader = this.mountPreloaderElement(document.body);

        preloader.classList.add(this.constructor.getHiddenClass());

        setTimeout(() => {
            preloader.classList.remove(this.constructor.getHiddenClass());
        }, 100);

        return this;
    }

    stopPreloader() {
        document.body.classList.remove(this.constructor.getLoadingClass());
        this.removePreloaderElement();
        return this;
    }

    /**
     * @param parent {HTMLElement}
     * @returns {this}
     */
    mountStepTemplate() {
        // mount main layers
        this.mountHighlight(document.body);
        this.mountInteraction(document.body);
        this.mountControl(document.body);

        return this;
    }

    removeStepTemplate() {
        this.removeOverlayLayer();
        this.removeControlLayer();
        this.removeHighlightLayer();
        this.removeInteractionLayer();

        this.removeDefaultElement();

        return this;
    }

    mountElement(el, parent) {
        if (el.parentElement !== parent) {
            if (el.parentElement) {
                this.removeElement(el);
            }

            parent.appendChild(el);
        }

        return el;
    }

    removeElement(el) {
        if (el && el.parentElement) {
            el.parentElement.removeChild(el);
        }

        return this;
    }

    findDefaultElement(def = null) {
        return this.cache.get('defaultEl') || def;
    }

    createDefaultElement() {
        const el = document.createElement('div');
        el.className = this.constructor.getDefaultElementClass();
        return el;
    }

    mountDefaultElement(parent = document.body) {
        let el = this.findDefaultElement();

        if (!el) {
            el = this.createDefaultElement();
            this.cache.set('defaultEl', el);
        }

        return this.mountElement(el, parent);
    }

    removeDefaultElement() {
        this.removeElement(this.findDefaultElement());
        this.cache.delete('defaultEl');
        return this;
    }

    findPreloaderElement(def = null) {
        return this.cache.get('preloaderEl') || def;
    }

    createPreloaderElement() {
        const el = document.createElement('div');
        el.className = this.constructor.getPreloaderClass();
        return el;
    }

    mountPreloaderElement(parent = document.body) {
        let el = this.findPreloaderElement();

        if (!el) {
            el = this.createPreloaderElement();
            this.cache.set('preloaderEl', el);
        }

        return this.mountElement(el, parent);
    }

    removePreloaderElement() {
        this.removeElement(this.findPreloaderElement());
        this.cache.delete('preloaderEl');
        return this;
    }

    findOverlayLayer(def = null) {
        return this.cache.get('overlayLayer') || def;
    }

    createOverlayLayer() {
        const el = document.createElement('div');
        el.className = this.constructor.getOverlayClass();
        el.onclick = () => {
            const { exitOverlay } = this.options;

            if (exitOverlay) {
                this.stop();
            }
        };

        return el;
    }

    mountOverlayLayer(parent = document.body) {
        let el = this.findOverlayLayer();

        if (!el) {
            el = this.createOverlayLayer();
            this.cache.set('overlayLayer', el);
        }

        return this.mountElement(el, parent);
    }

    removeOverlayLayer() {
        this.removeElement(this.findOverlayLayer());
        this.cache.delete('overlayLayer');
        return this;
    }

    mountHighlight(parent = document.body) {
        const el = this.mountHighlightLayer(parent);
        this.setHighlightLayerPosition(el);
        return el;
    }

    findHighlightLayer(def = null) {
        return this.cache.get('highlightLayer') || def;
    }

    createHighlightLayer() {
        const el = document.createElement('div');
        el.className = this.constructor.getHighlightClass();
        return el;
    }

    mountHighlightLayer(parent = document.body) {
        let el = this.findHighlightLayer();

        if (!el) {
            el = this.createHighlightLayer();
            this.cache.set('highlightLayer', el);
        }

        return this.mountElement(el, parent);
    }

    removeHighlightLayer() {
        this.removeElement(this.findHighlightLayer());
        this.cache.delete('highlightLayer');
        return this;
    }

    mountInteraction(parent = document.body) {
        const el = this.mountInteractionLayer(parent);
        this.setInteractionLayerPosition(el);
        return el;
    }

    findInteractionLayer(def = null) {
        return this.cache.get('interactionLayer') || def;
    }

    createInteractionLayer() {
        const el = document.createElement('div');
        el.className = this.constructor.getInteractionClass();
        return el;
    }

    mountInteractionLayer(parent = document.body) {
        let el = this.findInteractionLayer();

        if (!el) {
            el = this.createInteractionLayer();
            this.cache.set('interactionLayer', el);
        }

        let { interaction } = this.options;

        if (this.currentStep && typeof this.currentStep.interaction === 'boolean') {
            interaction = this.currentStep.interaction;
        }

        // disable/enable interaction
        el.classList.toggle(this.constructor.getDisableInteractionClass(), !interaction);

        return this.mountElement(el, parent);
    }

    removeInteractionLayer() {
        this.removeElement(this.findInteractionLayer());
        this.cache.delete('interactionLayer');
        return this;
    }

    mountControl(parent = document.body) {
        const el = this.mountControlLayer(parent);
        this.mountTooltip(el);
        this.setControlLayerPosition(el);
        return el;
    }

    findControlLayer(def = null) {
        return this.cache.get('controlLayer') || def;
    }

    createControlLayer() {
        const el = document.createElement('div');
        el.className = this.constructor.getControlClass();
        return el;
    }

    mountControlLayer(parent = document.body) {
        let el = this.findControlLayer();

        if (!el) {
            el = this.createControlLayer();
            this.cache.set('controlLayer', el);
        }

        return this.mountElement(el, parent);
    }

    removeControlLayer() {
        this.removeElement(this.findControlLayer());
        this.cache.delete('controlLayer');
        return this;
    }

    mountTooltip(parent) {
        const tooltip = this.mountTooltipElement(parent);
        this.mountTooltipTailElement(tooltip);
        this.mountProgressbarElement(tooltip);
        this.mountTitleElement(tooltip);
        this.mountDescriptionElement(tooltip);
        this.mountCloseElement(tooltip);
        this.mountCustomButtonsElement(tooltip);
        this.mountNavigation(tooltip);
        this.mountCopyrightElement(tooltip);
        this.mountNotificationElement(tooltip);

        this.setTooltipElementPosition(tooltip, { boundary: document.documentElement });

        return tooltip;
    }

    findTooltipElement(def = null) {
        return this.cache.get('tooltipLayer') || def;
    }

    createTooltipElement() {
        const el = document.createElement('div');
        el.setAttribute('role', 'dialog');
        el.className = this.constructor.getTooltipClass();
        return el;
    }

    mountTooltipElement(parent) {
        let el = this.findTooltipElement();

        if (!el) {
            el = this.createTooltipElement();
            this.cache.set('tooltipLayer', el);
        }

        return this.mountElement(el, parent);
    }

    findTooltipTailElement(def = null) {
        return this.cache.get('tooltipTailEl') || def;
    }

    createTooltipTailElement() {
        const el = document.createElement('div');
        el.className = this.constructor.getTooltipTailClass();
        return el;
    }

    mountTooltipTailElement(parent) {
        let el = this.findTooltipTailElement();

        if (!el) {
            el = this.createTooltipTailElement();
            this.cache.set('tooltipTailEl', el);
        }

        return this.mountElement(el, parent);
    }

    findCloseElement(def = null) {
        return this.cache.get('closeEl') || def;
    }

    createCloseElement() {
        const el = document.createElement('div');
        el.className = this.constructor.getCloseClass();
        el.onclick = () => this.stop();
        return el;
    }

    mountCloseElement(parent) {
        let el = this.findCloseElement();

        if (!el) {
            el = this.createCloseElement();
            this.cache.set('closeEl', el);
        }

        return this.mountElement(el, parent);
    }

    findProgressbarElement(def = null) {
        return this.cache.get('progressbarEl') || def;
    }

    createProgressbarElement() {
        const el = document.createElement('div');
        el.className = this.constructor.getProgressbarClass();
        el.setAttribute('role', 'progress');
        el.setAttribute('aria-valuemin', 0);
        el.setAttribute('aria-valuemax', 100);
        return el;
    }

    mountProgressbarElement(parent) {
        let el = this.findProgressbarElement();

        if (!el) {
            el = this.createProgressbarElement();
            this.cache.set('progressbarEl', el);
        }

        const { showProgressbar } = this.options;

        el.classList.toggle(this.constructor.getHiddenClass(), !showProgressbar);

        const index = this.steps.indexOf(this.currentStep);
        const progress = ((index + 1) / this.steps.length) * 100;
        el.setAttribute('aria-valuenow', progress);
        el.style.cssText = `width: ${progress}%;`;

        return this.mountElement(el, parent);
    }

    findTitleElement(def = null) {
        return this.cache.get('titleEl') || def;
    }

    createTitleElement() {
        const el = document.createElement('div');
        el.className = this.constructor.getTitleClass();
        return el;
    }

    mountTitleElement(parent) {
        let el = this.findTitleElement();

        if (!el) {
            el = this.createTitleElement();
            this.cache.set('titleEl', el);
        }

        const { title = '' } = this.currentStep;
        el.innerHTML = title;
        el.classList.toggle(this.constructor.getHiddenClass(), !title);

        return this.mountElement(el, parent);
    }

    findDescriptionElement(def = null) {
        return this.cache.get('descriptionEl') || def;
    }

    createDescriptionElement() {
        const el = document.createElement('div');
        el.className = this.constructor.getDescriptionClass();
        return el;
    }

    mountDescriptionElement(parent) {
        let el = this.findDescriptionElement();

        if (!el) {
            el = this.createDescriptionElement();
            this.cache.set('descriptionEl', el);
        }

        const { description = '' } = this.currentStep;
        el.innerHTML = description;
        el.classList.toggle(this.constructor.getHiddenClass(), !description);

        return this.mountElement(el, parent);
    }

    findCustomButtonsElement(def = null) {
        return this.cache.get('customButtonsEl') || def;
    }

    createCustomButtonsElement() {
        const el = document.createElement('div');
        el.className = this.constructor.getCustomButtonsClass();
        return el;
    }

    mountCustomButtonsElement(parent) {
        let el = this.findCustomButtonsElement();

        if (!el) {
            el = this.createCustomButtonsElement();
            this.cache.set('customButtonsEl', el);
        }

        // clean layer from previous buttons
        el.innerHTML = '';

        const { buttons = [] } = this.currentStep;

        el.classList.toggle(this.constructor.getHiddenClass(), !buttons.length);

        buttons.forEach((button) => {
            el.appendChild((button.ownerDocument) ? button : this.createCustomButtonElement(button));
        });

        return this.mountElement(el, parent);
    }

    createCustomButtonElement({ tagName = 'button', title = '', class: className, onClick }) {
        const el = document.createElement(tagName);
        el.innerHTML = title;

        if (className) {
            el.className = className;
        }

        if (onClick) {
            el.onclick = (e) => onClick.call(this, e);
        }

        return el;
    }

    mountNavigation(parent) {
        const navigation = this.mountNavigationElement(parent);
        const prev = this.mountNavigationPrevElement(navigation);
        const pagination = this.mountPaginationElement(navigation);
        const next = this.mountNavigationNextElement(navigation);

        navigation.classList.toggle(
            this.constructor.getHiddenClass(),
            [prev, pagination, next].every((el) => el.classList.contains(this.constructor.getHiddenClass())),
        );

        return navigation;
    }

    findNavigationElement(def = null) {
        return this.cache.get('navigationEl') || def;
    }

    createNavigationElement() {
        const el = document.createElement('div');
        el.className = this.constructor.getNavigationClass();
        return el;
    }

    mountNavigationElement(parent) {
        let el = this.findNavigationElement();

        if (!el) {
            el = this.createNavigationElement();
            this.cache.set('navigationEl', el);
        }

        return this.mountElement(el, parent);
    }

    findPaginationElement(def = null) {
        return this.cache.get('paginationEl') || def;
    }

    createPaginationElement() {
        const el = document.createElement('div');
        el.className = this.constructor.getPaginationClass();
        return el;
    }

    mountPaginationElement(parent) {
        let el = this.findPaginationElement();

        if (!el) {
            el = this.createPaginationElement();
            this.cache.set('paginationEl', el);
        }

        // cleanup pagination
        el.innerHTML = '';

        const { showPagination } = this.options;

        el.classList.toggle(this.constructor.getHiddenClass(), (!showPagination || this.steps.length <= 1));

        this.steps.forEach((s, i) => {
            el.appendChild(this.createPaginationItemElement(s, i));
        });

        return this.mountElement(el, parent);
    }

    createPaginationItemElement(step, index) {
        const el = document.createElement('div');
        el.className = this.constructor.getPaginationItemClass();

        if (this.currentStep === step) {
            el.classList.add(this.constructor.getPaginationCurrentItemClass());
        }

        el.onclick = () => {
            switch (index) {
                case this.previousStepIndex: {
                    return this.previous();
                }

                case this.nextStepIndex: {
                    return this.next();
                }

                default: {
                    return this.go(index, true);
                }
            }
        };

        return el;
    }

    findNavigationPrevElement(def = null) {
        return this.cache.get('navigationPrevEl') || def;
    }

    createNavigationPrevElement() {
        const el = document.createElement('div');
        el.className = this.constructor.getNavigationPrevClass();
        el.onclick = () => this.previous();
        return el;
    }

    mountNavigationPrevElement(parent) {
        let el = this.findNavigationPrevElement();

        if (!el) {
            el = this.createNavigationPrevElement();
            this.cache.set('navigationPrevEl', el);
        }

        el.classList.toggle(this.constructor.getHiddenClass(), (this.previousStepIndex < 0));

        return this.mountElement(el, parent);
    }

    findNavigationNextElement(def = null) {
        return this.cache.get('navigationNextEl') || def;
    }

    createNavigationNextElement() {
        const el = document.createElement('div');
        el.className = this.constructor.getNavigationNextClass();
        el.onclick = () => this.next();
        return el;
    }

    mountNavigationNextElement(parent) {
        let el = this.findNavigationNextElement();

        if (!el) {
            el = this.createNavigationNextElement();
            this.cache.set('navigationNextEl', el);
        }

        el.classList.toggle(this.constructor.getHiddenClass(), (this.nextStepIndex < 0));

        return this.mountElement(el, parent);
    }

    findCopyrightElement(def = null) {
        return this.cache.get('copyrightEl') || def;
    }

    createCopyrightElement() {
        const el = document.createElement('div');
        el.className = this.constructor.getCopyrightClass();
        return el;
    }

    mountCopyrightElement(parent) {
        let el = this.findCopyrightElement();

        if (!el) {
            el = this.createCopyrightElement();
            this.cache.set('copyrightEl', el);
        }

        el.innerHTML = 'Made with GuideChimp';

        return this.mountElement(el, parent);
    }

    findNotificationElement(def = null) {
        return this.cache.get('notificationEl') || def;
    }

    createNotificationElement() {
        const el = document.createElement('div');
        el.className = this.constructor.getNotificationClass();
        return el;
    }

    mountNotificationElement(parent) {
        let el = this.findNotificationElement();

        if (!el) {
            el = this.createNotificationElement();
            this.cache.set('notificationEl', el);
        }

        const [message = ''] = this.notifications;
        el.innerHTML = message;

        return this.mountElement(el, parent);
    }

    removeNotificationElement() {
        this.removeElement(this.findControlLayer());
        this.cache.delete('controlLayer');
        return this;
    }

    notify(message) {
        this.notifications.push(message);

        const el = this.findNotificationElement();

        if (el) {
            el.innerHTML = message;
        }

        return this;
    }

    /**
     * Register an event listener for a tour event.
     *
     * Event names can be comma-separated to register multiple events.
     *
     * @param {string} event The name of the event to listen for.
     * @param {function} listener The event listener, accepts context.
     * @param {object} options Listener options
     * @return {this}
     */
    on(event, listener, options = {}) {
        // priorities from low to high
        const priorities = this.constructor.getEventListenersPriorities();

        let [priority] = priorities;

        if (options.priority && priorities.includes(options.priority)) {
            priority = options.priority;
        }

        const e = event.trim();

        this.listeners[e] = this.listeners[e] || {};
        this.listeners[e][priority] = this.listeners[e][priority] || [];
        this.listeners[e][priority].push(listener);

        return this;
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
        // from high to low
        const priorities = [...this.constructor.getEventListenersPriorities()].reverse();

        const e = event.trim();

        let result = [];
        let promise = Promise.resolve(result);

        if (this.listeners[e]) {
            priorities.forEach((priority) => {
                const { [priority]: listeners } = this.listeners[e];

                if (listeners) {
                    promise = promise
                        .then(() => Promise.all(
                            listeners.map((f) => Promise.resolve().then(() => f.apply(this, args))),
                        ))
                        .then((r) => {
                            result = [...result, ...r];
                            return result;
                        });
                }
            });
        }

        return promise;
    }

    /**
     * Add keydown event listener
     * @return {this}
     */
    addOnKeydownListener() {
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

            const { previous: previousCodes, next: nextCodes, stop: stopCodes } = {
                ...this.constructor.getDefaultKeyboardCodes(),
                ...this.options.useKeyboard,
            };

            //  stop tour
            if (stopCodes && stopCodes.includes(keyCode)) {
                this.stop();
                return;
            }

            // go to the previous step
            if (previousCodes && previousCodes.includes(keyCode)) {
                this.previous();
                return;
            }

            // go to the next step
            if (nextCodes && nextCodes.includes(keyCode)) {
                this.next();
            }
        };
    }

    /**
     * Remove keydown event listener
     * @return {this}
     */
    removeOnKeydownListener() {
        if (this.cache.has('onKeydownListener')) {
            window.removeEventListener('keydown', this.cache.get('onKeydownListener'), true);
            this.cache.delete('onKeydownListener');
        }

        return this;
    }

    /**
     * Add window resize event listener
     * @return {this}
     */
    addOnWindowResizeListener() {
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
     * Remove window resize event listener
     * @return {this}
     */
    removeOnWindowResizeListener() {
        if (this.cache.has('onWindowResizeListener')) {
            window.removeEventListener('resize', this.cache.get('onWindowResizeListener'), true);
            this.cache.delete('onWindowResizeListener');
        }

        return this;
    }

    removeListeners() {
        this.removeOnKeydownListener();
        this.removeOnWindowResizeListener();
    }

    observeStep() {
        this.observeResizing();
        this.observeMutation();
    }

    observeResizing(options = { box: 'border-box' }) {
        let { resizingObserver: observer } = this.observers;

        if (!observer && typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(() => {
                if (!this && !this.currentStep) {
                    return;
                }

                this.refresh();
            });

            this.observers.resizingObserver = observer;
        }

        if (observer) {
            // observe elements
            observer.observe(this.getStepElement(this.currentStep), options);
            return true;
        }

        return false;
    }

    unobserveResizing() {
        const { resizingObserver: observer } = this.observers;

        if (observer) {
            observer.disconnect();
            return true;
        }

        return false;
    }

    observeMutation() {
        let { mutationObserver: observer } = this.observers;

        let elExists = true;

        if (!observer) {
            observer = new MutationObserver((mutations) => {
                if (!this && !this.currentStep) {
                    return;
                }

                const el = this.getStepElement(this.currentStep);

                const refresh = () => {
                    this.resetHighlighting(el);

                    this.highlightStepElement();
                    this.scrollParentsToStepElement();
                    this.refresh();
                };

                if (elExists) {
                    mutations.forEach((record) => {
                        if (record.type === 'childList' && record.removedNodes.length) {
                            record.removedNodes.forEach((node) => {
                                if (node === el || node.contains(el)) {
                                    const newEl = this.getStepElement(this.currentStep, true);
                                    const defaultEl = this.findDefaultElement();
                                    refresh();

                                    if (newEl === defaultEl) {
                                        elExists = false;
                                    }
                                }
                            });
                        }
                    });
                } else {
                    const newEl = this.getStepElement(this.currentStep, true);
                    const defaultEl = this.findDefaultElement();

                    mutations.forEach((record) => {
                        if (record.type === 'childList' && record.addedNodes.length) {
                            if (newEl !== defaultEl) {
                                refresh();
                                elExists = true;
                            }
                        }
                    });
                }
            });

            this.observers.mutationObserver = observer;
        }

        observer.observe(this.getStepElement(this.currentStep).ownerDocument.body, {
            childList: true,
            subtree: true,
        });

        return true;
    }

    unobserveMutation() {
        const { mutationObserver: observer } = this.observers;

        if (observer) {
            observer.disconnect();
            return true;
        }

        return false;
    }

    unobserve() {
        this.unobserveResizing();
        this.unobserveMutation();
    }

    cleanupAfterPreviousStep() {
        // remove all highlighting
        this.resetHighlightingAll();

        // remove previous step element observers
        this.unobserve();
    }

    /**
     * Refresh layers position
     * @returns {this}
     */
    refresh() {
        if (!this.currentStep) {
            return this;
        }

        if (this.findHighlightLayer()) {
            this.setHighlightLayerPosition(this.findHighlightLayer());
        }

        if (this.findInteractionLayer()) {
            this.setInteractionLayerPosition(this.findInteractionLayer());
        }

        if (this.findControlLayer()) {
            this.setControlLayerPosition(this.findControlLayer());
        }

        if (this.findTooltipElement()) {
            this.setTooltipElementPosition(this.findTooltipElement(), { boundary: window });
        }

        return this;
    }
}
