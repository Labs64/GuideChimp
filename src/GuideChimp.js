/* eslint-disable class-methods-use-this */
/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the European Union Public License, version 1.2
 * located in the LICENSE file
 */

/**
 * Lodash functions
 * @see https://lodash.com/docs
 */
import _uniqueId from 'lodash/uniqueId';

// utils
import domTemplate from './utils/domTemplate';
import isHtmlElement from './utils/isHtmlElement';

// templates
import overlayTmpl from './templates/overlay.html';
import preloaderTmpl from './templates/preloader.html';
import interactionTmpl from './templates/interaction.html';
import controlTmpl from './templates/control.html';
import tooltipTmpl from './templates/tooltip.html';
import progressbarTmpl from './templates/progressbar.html';
import titleTmpl from './templates/title.html';
import descriptionTmpl from './templates/description.html';
import customButtonsTmpl from './templates/custom-buttons.html';
import previousTmpl from './templates/previous.html';
import paginationTmpl from './templates/pagination.html';
import nextTmpl from './templates/next.html';
import closeTmpl from './templates/close.html';
import copyrightTmpl from './templates/copyright.html';
import notificationTmpl from './templates/notification.html';
import fakeStepTmpl from './templates/fake-step.html';

export default class GuideChimp {
    /**
     * GuideChimp constructor
     * @param tour
     * @param options
     */
    constructor(tour, options = {}) {
        Object.defineProperty(this, 'uid', {
            value: _uniqueId(),
            enumerable: false,
            configurable: false,
            writable: false,
        });

        this.setDefaults();

        this.cache = new Map();

        this.listeners = {};

        this.observers = {};

        this.options = {};
        this.setOptions(options);

        this.tour = null;
        this.setTour(tour);

        this.notifications = [];

        this.elements = new Map();

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
            showNavigation: true,
            showProgressbar: true,
            paginationTheme: 'circles',
            paginationCirclesMaxItems: 10,
            interaction: true,
            padding: 8,
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

    static getLoadingClass() {
        return 'gc-loading';
    }

    static getHighlightClass() {
        return 'gc-highlight';
    }

    static getFixedClass() {
        return 'gc-fixed';
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

        this.isDisplayed = false;

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
    async start(number = 0, useIndex = true, ...args) {
        this.isDisplayed = true;

        this.mountOverlayEl();

        this.startPreloader();

        // emit start event
        await this.emit('onStart', ...args);

        this.stopPreloader();

        if (!this.tour || !this.tour.length) {
            this.removeOverlayEl();
            this.isDisplayed = false;
            return false;
        }

        this.steps = this.sortSteps(this.getSteps(this.tour));

        if (!this.steps.length) {
            this.removeOverlayEl();
            this.isDisplayed = false;
            return false;
        }

        // add a class that increase the specificity of the classes
        document.body.classList.add(this.constructor.getBodyClass());

        const isStarted = await this.go(number, useIndex, ...args);

        this.isDisplayed = isStarted;

        document.body.classList.toggle(this.constructor.getBodyClass(), isStarted);

        if (isStarted) {
            // turn on keyboard navigation
            if (this.options.useKeyboard) {
                this.addOnKeydownListener();
            }

            // on window resize
            this.addOnWindowResizeListener();

            // on window scroll
            this.addOnWindowScrollListener();
        }

        return isStarted;
    }

    /**
     * Go to step
     * @param number step number or it index
     * @param useIndex whether to use step number or index
     * @param args
     * @return {Promise<boolean>}
     */
    async go(number, useIndex = true, ...args) {
        if (!this.isDisplayed || !this.steps.length) {
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

        this.startPreloader();

        let abort = false;

        if (onBeforeChange) {
            if (await Promise.resolve().then(() => onBeforeChange.call(this, toStep, fromStep, ...args)) === false) {
                abort = true;
            }
        }

        if ((await this.emit('onBeforeChange', toStep, fromStep, ...args)).some((r) => r === false)) {
            abort = true;
        }

        this.stopPreloader();

        if (abort) {
            return false;
        }

        this.beforeChangeStep({ toStep, toStepIndex, currentStep, currentStepIndex, fromStep, fromStepIndex });

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

        // scroll to element
        this.scrollParentsToStepEl();
        this.scrollTo(this.getStepEl(this.currentStep, true), scrollBehavior, scrollPadding);

        this.mountStep();

        setTimeout(() => {
            if (this.getEl('tooltip')) {
                this.scrollTo(this.getEl('tooltip'), scrollBehavior, scrollPadding);
            }
        }, 300);

        if (onAfterChange) {
            onAfterChange.call(this, this.toStep, this.fromStep, ...args);
        }

        this.emit('onAfterChange', this.toStep, this.fromStep, ...args);

        return true;
    }

    async previous(...args) {
        if (!this.isDisplayed || !this.currentStep || !this.previousStep) {
            return false;
        }

        const { onPrevious } = this.currentStep;

        this.startPreloader();

        if (onPrevious) {
            if (await Promise.resolve()
                .then(() => onPrevious.call(this, this.previousStep, this.currentStep, ...args)) === false) {
                this.stopPreloader();
                return false;
            }
        }

        if ((await this.emit('onPrevious', this.previousStep, this.currentStep, ...args)).some((r) => r === false)) {
            this.stopPreloader();
            return false;
        }

        this.stopPreloader();

        return this.go(this.previousStepIndex, true, ...args);
    }

    async next(...args) {
        if (!this.isDisplayed || !this.currentStep || !this.nextStep) {
            return false;
        }

        const { onNext } = this.currentStep;

        this.startPreloader();

        if (onNext) {
            if (await Promise.resolve()
                .then(() => onNext.call(this, this.nextStep, this.currentStep, ...args)) === false) {
                this.stopPreloader();
                return false;
            }
        }

        if ((await this.emit('onNext', this.nextStep, this.currentStep, ...args)).some((r) => r === false)) {
            this.stopPreloader();
            return false;
        }

        this.stopPreloader();

        return this.go(this.nextStepIndex, true, ...args);
    }

    async stop(...args) {
        if (!this.isDisplayed) {
            return this;
        }

        if (this.currentStepIndex === this.steps.length - 1) {
            this.startPreloader();
            await this.emit('onComplete', ...args);
            this.stopPreloader();
        }

        this.startPreloader();

        // emit stop event
        await this.emit('onStop', ...args);

        this.stopPreloader();

        // remove the class that increase the specificity of the classes
        document.body.classList.remove(this.constructor.getBodyClass());

        // remove events listeners
        this.removeListeners();

        // disconnect observers
        this.unobserveStep();

        // remove all layers and keys
        this.unmountStep();

        // remove overlay
        this.removeOverlayEl();

        this.cache.clear();
        this.elements.clear();

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

    getStepEl(step) {
        const { element } = step || {};

        if (!element) {
            return this.mountFakeStepEl();
        }

        const getEl = (selector, def = null) => {
            const el = (typeof selector === 'string')
                ? document.querySelector(selector)
                : selector;
            return el || def;
        };

        let el = getEl(element);

        if (!el || el.style.display === 'none' || el.style.visibility === 'hidden') {
            el = this.getEl('fakeStep') ? this.getEl('fakeStep') : this.mountFakeStepEl();
        }

        return el;
    }

    scrollParentsToStepEl() {
        const { scrollPadding = this.options.scrollPadding } = this.currentStep;
        return this.scrollParentsToEl(this.getStepEl(this.currentStep), scrollPadding);
    }

    getScrollableParentsEls(el) {
        const parents = [];
        let htmlEl = el;

        while (htmlEl && htmlEl !== htmlEl.ownerDocument.body) {
            htmlEl = this.getScrollableParentEl(htmlEl);
            parents.push(htmlEl);
        }

        return parents;
    }

    getScrollableParentEl(el) {
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

    scrollParentsToEl(el, scrollPadding = 0) {
        // get all scrollable parents
        const parents = this.getScrollableParentsEls(el);

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

    highlightStepEl(animation = false) {
        const el = this.getStepEl(this.currentStep);

        const overlay = this.getEl('overlay');

        if (overlay) {
            const path = overlay.querySelector('path');
            const animate = path.querySelector('animate');

            const isCurrentElFake = this.isEl(el, 'fakeStep');

            const to = (isCurrentElFake)
                ? this.getOverlayDocumentPath()
                : this.getOverlayStepPath(this.currentStep);

            path.setAttribute('d', to);

            if (animate) {
                const isFromElFake = this.isEl(this.getStepEl(this.fromStep), 'fakeStep');

                const from = (this.fromStep && !isFromElFake && !isCurrentElFake)
                    ? this.getOverlayStepPath(this.fromStep)
                    : null;

                if (!from) {
                    animate.removeAttribute('from');
                    animate.removeAttribute('to');
                } else {
                    animate.setAttribute('from', from);
                    animate.setAttribute('to', to);
                }

                if (animation) {
                    animate.beginElement();
                }
            }
        }

        const elStyle = getComputedStyle(el);

        if (!['absolute', 'relative', 'fixed'].includes(elStyle.getPropertyValue('position'))) {
            el.classList.add(this.constructor.getRelativePositionClass());
        }

        el.classList.add(this.constructor.getHighlightClass());

        el.setAttribute(`data-guidechimp-${this.uid}`, 'highlight');
        this.elements.set('highlight', el);

        return this;
    }

    resetHighlightStepEl() {
        const overlay = this.getEl('overlay');

        if (overlay) {
            const path = overlay.querySelector('path');
            const animate = overlay.querySelector('animate');

            path.setAttribute('d', this.getOverlayDocumentPath());

            if (animate) {
                animate.removeAttribute('from');
                animate.removeAttribute('to');
            }
        }

        const el = this.getStepEl(this.currentStep);

        el.classList.remove(this.constructor.getRelativePositionClass());
        el.classList.remove(this.constructor.getHighlightClass());

        el.removeAttribute(`data-guidechimp-${this.uid}`);
        this.elements.delete('highlight');

        return this;
    }

    setInteractionPosition(interactionEl) {
        const el = this.getStepEl(this.currentStep);

        if (!interactionEl || !el) {
            return this;
        }

        let { padding } = this.options;

        const elStyle = getComputedStyle(el);

        if (elStyle.getPropertyValue('position') === 'floating') {
            padding = 0;
        }

        const { width, height, top, left } = this.constructor.getOffset(el);

        interactionEl.classList.toggle(this.constructor.getFixedClass(), this.constructor.isFixed(el));

        const { style } = interactionEl;

        // set new position
        style.cssText = `width: ${width + padding}px;
        height: ${height + padding}px;
        top: ${top - (padding / 2)}px;
        left: ${left - (padding / 2)}px;`;

        return this;
    }

    setControlPosition(controlEl) {
        const el = this.getStepEl(this.currentStep);

        if (!controlEl || !el) {
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

        controlEl.classList.toggle(this.constructor.getFixedClass(), this.constructor.isFixed(el));

        const { style } = controlEl;

        // set new position
        style.cssText = `width: ${width}px;
        height: ${height}px;
        top: ${top}px;
        left: ${left}px;`;

        return this;
    }

    setTooltipPosition(tooltipEl, options = {}) {
        if (!this.currentStep) {
            return this;
        }

        const el = this.getStepEl(this.currentStep);

        if (!tooltipEl || !el) {
            return this;
        }

        let { boundary, position: pos } = options;
        let { padding } = this.options;

        boundary = boundary || window;

        pos = pos || this.currentStep.position;
        pos = pos || this.options.position;

        let [position, alignment] = pos.split('-');

        const elStyle = getComputedStyle(el);

        if (elStyle.getPropertyValue('position') === 'floating') {
            padding = 0;
        }

        const { style: tooltipStyle } = tooltipEl;

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

        const { height: tooltipHeight, width: tooltipWith } = tooltipEl.getBoundingClientRect();

        // find out min tooltip width
        const cloneTooltip = tooltipEl.cloneNode(true);
        cloneTooltip.style.visibility = 'hidden';
        cloneTooltip.innerHTML = '';

        tooltipEl.parentElement.appendChild(cloneTooltip);

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
        if (this.isEl(el, 'fakeStep')) {
            position = 'floating';
        } else {
            // calculate position
            const positions = ['bottom', 'right', 'left', 'top'];

            let {
                marginTop: tooltipMarginTop,
                marginLeft: tooltipMarginLeft,
                marginRight: tooltipMarginRight,
                marginBottom: tooltipMarginBottom,
            } = getComputedStyle(tooltipEl);

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

                if (alignments.length) {
                    alignment = alignments.includes(alignment) ? alignment : alignments[0];
                } else {
                    alignment = 'middle';
                }
            }
        }

        tooltipEl.setAttribute('data-guidechimp-position', position);

        const root = document.documentElement;

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

        tooltipEl.removeAttribute('data-guidechimp-alignment');

        if (alignment) {
            tooltipEl.setAttribute('data-guidechimp-alignment', alignment);

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

        const overlay = this.getEl('overlay');

        if (overlay) {
            const path = overlay.querySelector('path');
            const animate = overlay.querySelector('animate');

            const preloaderCache = new Map();
            preloaderCache.set('d', path.getAttribute('d'));

            path.setAttribute('d', this.getOverlayDocumentPath());

            if (animate) {
                preloaderCache.set('from', animate.getAttribute('from'));
                preloaderCache.set('to', animate.getAttribute('to'));

                animate.removeAttribute('from');
                animate.removeAttribute('to');
            }

            this.cache.set('preloaderCache', preloaderCache);
        }

        const preloader = this.mountPreloaderEl();
        preloader.hidden = true;

        setTimeout(() => {
            preloader.hidden = false;
        }, 100);

        return this;
    }

    stopPreloader() {
        document.body.classList.remove(this.constructor.getLoadingClass());

        const overlay = this.getEl('overlay');

        if (overlay) {
            const path = overlay.querySelector('path');
            const animate = overlay.querySelector('animate');

            const preloaderCache = this.cache.get('preloaderCache') || new Map();

            if (preloaderCache.has('d')) {
                path.setAttribute('d', preloaderCache.get('d'));
            }

            if (animate) {
                if (preloaderCache.has('from')) {
                    animate.setAttribute('from', preloaderCache.get('from'));
                }

                if (preloaderCache.has('to')) {
                    animate.setAttribute('to', preloaderCache.get('to'));
                }
            }

            this.cache.delete('preloaderCache');
        }

        this.removePreloaderEl();
        return this;
    }

    getDefaultTmplData() {
        return {
            previousStep: this.previousStep,
            currentStep: this.currentStep,
            nextStep: this.nextStep,
            fromStep: this.fromStep,
            toStep: this.toStep,

            previousStepIndex: this.previousStepIndex,
            currentStepIndex: this.currentStepIndex,
            nextStepIndex: this.nextStepIndex,
            fromStepIndex: this.fromStepIndex,
            toStepIndex: this.toStepIndex,

            steps: this.steps,

            go: (...args) => this.go(...args),
            previous: (...args) => this.previous(...args),
            next: (...args) => this.next(...args),
            stop: (...args) => this.stop(...args),
        };
    }

    mountStep() {
        const interactionEl = this.mountInteractionEl();
        const controlEl = this.mountControlEl();

        this.setInteractionPosition(interactionEl);
        this.setControlPosition(controlEl);
        this.setTooltipPosition(this.getEl('tooltip'));

        this.observeStep();

        this.highlightStepEl(true);

        return this;
    }

    unmountStep() {
        this.resetHighlightStepEl();

        this.removeInteractionEl();
        this.removeControlEl();
        this.removePreloaderEl();
        this.removeFakeStepEl();

        return this;
    }

    createEl(name, tmpl, data = {}) {
        const el = domTemplate(tmpl, data);

        if (el) {
            el.setAttribute(`data-quidechimp-${this.uid}`, name);
        }

        return el;
    }

    getEl(key, def = null) {
        let el = this.elements.get(key);

        if (!el) {
            el = document.querySelector(`[data-quidechimp-${this.uid}="${key}"]`);
        }

        return el || def;
    }

    mountEl(el, parent) {
        if (el) {
            const els = el.querySelectorAll(`[data-quidechimp-${this.uid}]`);

            [el, ...els].forEach((v) => {
                const key = v.getAttribute(`data-quidechimp-${this.uid}`);
                if (key) {
                    this.removeEl(key);
                    this.elements.set(key, v);
                }
            });

            parent.appendChild(el);
        }

        return el;
    }

    removeEl(key) {
        const el = this.getEl(key);

        if (el) {
            el.parentElement.removeChild(el);
        }

        this.elements.delete(key);

        return this;
    }

    isEl(el, key) {
        return (this.getEl(key))
            ? el === this.getEl(key)
            : el.getAttribute(`data-quidechimp-${this.uid}`) === key;
    }

    getFakeStepTmpl() {
        return fakeStepTmpl;
    }

    createFakeStepEl(data = {}) {
        return this.createEl('fakeStep', this.getFakeStepTmpl(), { ...this.getDefaultTmplData(), ...data });
    }

    mountFakeStepEl(data = {}) {
        return this.mountEl(this.createFakeStepEl(data), document.body);
    }

    removeFakeStepEl() {
        return this.removeEl('fakeStep');
    }

    getPreloaderTmpl() {
        return preloaderTmpl;
    }

    createPreloaderEl(data = {}) {
        return this.createEl('preloader', this.getPreloaderTmpl(), data);
    }

    mountPreloaderEl(data = {}) {
        return this.mountEl(this.createPreloaderEl(data), document.body);
    }

    removePreloaderEl() {
        return this.removeEl('preloader');
    }

    getOverlayDocumentPath() {
        return `M 0 0 H ${document.body.scrollWidth} V ${document.body.scrollHeight} H 0 V 0 Z`;
    }

    getOverlayStepPath(step) {
        return this.getOverlayElPath(this.getStepEl(step));
    }

    getOverlayElPath(el) {
        let { padding } = this.options;
        padding = (padding) ? padding / 2 : 0;

        const { left, top, width, height } = el.getBoundingClientRect();
        const r = 4;

        let path = this.getOverlayDocumentPath();

        path += `M ${left - padding + r} ${top - padding}
                 a ${r},${r} 0 0 0 -${r},${r}
                 V ${height + top + padding - r}
                 a ${r},${r} 0 0 0 ${r},${r}
                 H ${width + left + padding - r}
                 a ${r},${r} 0 0 0 ${r},-${r}
                 V ${top - padding + r}
                 a ${r},${r} 0 0 0 -${r},-${r}Z`;

        return path;
    }

    getOverlayTmpl() {
        return overlayTmpl;
    }

    createOverlayEl(data = {}) {
        const defaults = {
            stop: async (...args) => {
                if (this.options.exitOverlay) {
                    await this.stop(...args);
                }
            },
            path: this.getOverlayDocumentPath(),
        };

        return this.createEl('overlay', this.getOverlayTmpl(), { ...defaults, ...data });
    }

    mountOverlayEl(data = {}) {
        return this.mountEl(this.createOverlayEl(data), document.body);
    }

    removeOverlayEl() {
        return this.removeEl('overlay');
    }

    getInteractionTmpl() {
        return interactionTmpl;
    }

    createInteractionEl(data = {}) {
        let { interaction } = this.options;

        if (typeof this.currentStep.interaction === 'boolean') {
            interaction = this.currentStep.interaction;
        }

        const defaults = {
            ...this.getDefaultTmplData(),
            interaction,
        };

        return this.createEl('interaction', this.getInteractionTmpl(), { ...defaults, ...data });
    }

    mountInteractionEl(data = {}) {
        return this.mountEl(this.createInteractionEl(data), document.body);
    }

    removeInteractionEl() {
        return this.removeEl('interaction');
    }

    getControlTmpl() {
        return controlTmpl;
    }

    createControlEl(data = {}) {
        return this.createEl(
            'control',
            this.getControlTmpl(),
            { ...this.getDefaultTmplData(), tooltipEl: this.createTooltipEl(data), ...data },
        );
    }

    mountControlEl(data = {}) {
        return this.mountEl(this.createControlEl(data), document.body);
    }

    removeControlEl() {
        return this.removeEl('control');
    }

    getTooltipTmpl() {
        return tooltipTmpl;
    }

    createTooltipEl(data = {}) {
        const defaults = {
            ...this.getDefaultTmplData(),
            progressbar: this.createProgressbarEl(data),
            title: this.createTitleEl(data),
            description: this.createDescriptionEl(data),
            close: this.createCloseEl(data),
            customButtons: this.createCustomButtonsEl(data),
            previous: this.createPreviousEl(data),
            pagination: this.createPaginationEl(data),
            next: this.createNextEl(data),
            copyright: this.createCopyrightEl(data),
            notification: this.createNotificationEl(data),
        };

        return this.createEl('tooltip', this.getTooltipTmpl(), { ...defaults, ...data });
    }

    getCloseTmpl() {
        return closeTmpl;
    }

    createCloseEl(data = {}) {
        return this.createEl('close', this.getCloseTmpl(), { ...this.getDefaultTmplData(), ...data });
    }

    getProgressbarTmpl() {
        return progressbarTmpl;
    }

    createProgressbarEl(data = {}) {
        let { showProgressbar } = this.options;

        if (typeof this.currentStep.showProgressbar === 'boolean') {
            showProgressbar = this.currentStep.showProgressbar;
        }

        const progressMax = 100;
        const progressMin = 0;
        const progress = ((this.currentStepIndex + 1) / this.steps.length) * 100;

        const defaults = {
            ...this.getDefaultTmplData(),
            showProgressbar,
            progressMax,
            progressMin,
            progress,
        };

        return this.createEl('progressbar', this.getProgressbarTmpl(), { ...defaults, ...data });
    }

    getTitleTmpl() {
        return titleTmpl;
    }

    createTitleEl(data = {}) {
        const { title = '' } = this.currentStep;
        return this.createEl('title', this.getTitleTmpl(), { ...this.getDefaultTmplData(), title, ...data });
    }

    getDescriptionTmpl() {
        return descriptionTmpl;
    }

    createDescriptionEl(data = {}) {
        const { description = '' } = this.currentStep;

        return this.createEl(
            'description',
            this.getDescriptionTmpl(),
            { ...this.getDefaultTmplData(), description, ...data },
        );
    }

    getCustomButtonsTmpl() {
        return customButtonsTmpl;
    }

    createCustomButtonsEl(data = {}) {
        const buttons = [];

        if (this.currentStep.buttons) {
            this.currentStep.buttons.forEach((button) => {
                let buttonEl = button;

                if (!isHtmlElement(buttonEl)) {
                    const { onClick, tagName = 'button', title = '', class: className } = button;

                    buttonEl = document.createElement(tagName);
                    buttonEl.innerHTML = title;

                    if (className) {
                        buttonEl.className = className;
                    }

                    if (onClick) {
                        buttonEl.addEventListener('click', (e) => {
                            onClick.call(this, e);
                        });
                    }
                }

                buttons.push(buttonEl);
            });
        }

        return this.createEl(
            'customButtons',
            this.getCustomButtonsTmpl(),
            { ...this.getDefaultTmplData(), buttons, ...data },
        );
    }

    getPaginationTmpl() {
        return paginationTmpl;
    }

    createPaginationEl(data = {}) {
        const {
            paginationTheme = this.options.paginationTheme,
            paginationCirclesMaxItems = this.options.paginationCirclesMaxItems,
        } = this.currentStep;

        let { showPagination } = this.options;

        if (typeof this.currentStep.showPagination === 'boolean') {
            showPagination = this.currentStep.showPagination;
        }

        return this.createEl(
            'pagination',
            this.getPaginationTmpl(),
            {
                ...this.getDefaultTmplData(),
                showPagination,
                paginationTheme,
                paginationCirclesMaxItems,
                ...data,
            },
        );
    }

    getPreviousTmpl() {
        return previousTmpl;
    }

    createPreviousEl(data = {}) {
        let { showNavigation } = this.options;

        if (typeof this.currentStep.showNavigation === 'boolean') {
            showNavigation = this.currentStep.showNavigation;
        }

        return this.createEl(
            'previous',
            this.getPreviousTmpl(),
            { ...this.getDefaultTmplData(), showNavigation, ...data },
        );
    }

    getNextTmpl() {
        return nextTmpl;
    }

    createNextEl(data = {}) {
        let { showNavigation } = this.options;

        if (typeof this.currentStep.showNavigation === 'boolean') {
            showNavigation = this.currentStep.showNavigation;
        }

        return this.createEl(
            'next',
            this.getNextTmpl(),
            { ...this.getDefaultTmplData(), showNavigation, ...data },
        );
    }

    getCopyrightTmpl() {
        return copyrightTmpl;
    }

    createCopyrightEl(data = {}) {
        return this.createEl('copyright', this.getCopyrightTmpl(), { ...this.getDefaultTmplData(), ...data });
    }

    getNotificationTmpl() {
        return notificationTmpl;
    }

    createNotificationEl(data = {}) {
        return this.createEl(
            'notification',
            this.getNotificationTmpl(),
            { ...this.getDefaultTmplData(), messages: this.notifications, ...data },
        );
    }

    notify(message) {
        this.notifications.push(message);

        const notificationEl = this.getEl('notification');

        if (notificationEl) {
            this.mountEl(this.createNotificationEl(), notificationEl.parentElement);
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
                this.stop({ event });
                return;
            }

            // go to the previous step
            if (previousCodes && previousCodes.includes(keyCode)) {
                this.previous({ event });
                return;
            }

            // go to the next step
            if (nextCodes && nextCodes.includes(keyCode)) {
                this.next({ event });
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

    /**
     * Add window scroll event listener
     * @returns {GuideChimp}
     */
    addOnWindowScrollListener() {
        this.cache.set('onWindowScrollListener', this.getOnWindowScrollListener());
        window.addEventListener('scroll', this.cache.get('onWindowScrollListener'), true);

        return this;
    }

    /**
     * Return on window scroll event listener function
     * @returns {function}
     */
    getOnWindowScrollListener() {
        return () => this.refresh();
    }

    /**
     * Remove window resize event listener
     * @return {this}
     */
    removeOnWindowScrollListener() {
        if (this.cache.has('onWindowScrollListener')) {
            window.removeEventListener('scroll', this.cache.get('onWindowScrollListener'), true);
            this.cache.delete('onWindowScrollListener');
        }

        return this;
    }

    removeListeners() {
        this.removeOnKeydownListener();
        this.removeOnWindowResizeListener();
        this.removeOnWindowScrollListener();
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
            observer.observe(this.getStepEl(this.currentStep), options);
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

        if (!observer) {
            observer = new MutationObserver((mutations) => {
                if (!this && !this.currentStep) {
                    return;
                }

                const { element } = this.currentStep;

                if (!element) {
                    return;
                }

                let el = this.getStepEl(this.currentStep);

                const isElExists = () => el && !this.isEl(el, 'fakeStep');

                mutations.forEach((record) => {
                    if (isElExists()) {
                        if (record.type === 'childList' && record.removedNodes.length) {
                            record.removedNodes.forEach((node) => {
                                if (node === el || node.contains(el)) {
                                    el = this.getStepEl(this.currentStep);
                                    this.scrollParentsToStepEl();
                                    this.refresh();
                                }
                            });
                        }
                    } else if (record.type === 'childList' && record.addedNodes.length) {
                        el = this.getStepEl(this.currentStep);

                        if (isElExists()) {
                            this.scrollParentsToStepEl();
                            this.refresh();
                        }
                    }
                });
            });

            this.observers.mutationObserver = observer;
        }

        observer.observe(this.getStepEl(this.currentStep).ownerDocument.body, {
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

    unobserveStep() {
        this.unobserveResizing();
        this.unobserveMutation();
    }

    beforeChangeStep() {
        this.unmountStep();
        this.unobserveStep();
    }

    /**
     * Refresh layers position
     * @returns {this}
     */
    refresh() {
        if (!this.currentStep) {
            return this;
        }

        this.resetHighlightStepEl();
        this.highlightStepEl();

        this.setControlPosition(this.getEl('control'));
        this.setInteractionPosition(this.getEl('interaction'));
        this.setTooltipPosition(this.getEl('tooltip'));

        return this;
    }
}
