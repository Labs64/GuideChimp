/* eslint-disable class-methods-use-this */
/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the European Union Public License, version 1.2
 * located in the LICENSE file
 */
// templates
import beaconTpl from './templates/beacon';

export default class Beacons {
    constructor(beacons, options = {}) {
        this.beacons = [];

        this.options = {};

        // observers
        this.observers = {};

        if (typeof ResizeObserver !== 'undefined') {
            this.observers.elementResizeObserver = new ResizeObserver(() => this.refresh());
        }

        this.cache = new Map();
        this.elements = new Map();

        this.setOptions(options);
        this.setBeacons(beacons);

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
            position: 'center',
            boundary: 'inner',
        };
    }

    static getFixedClass() {
        return 'gc-beacon-fixed';
    }

    static getBeaconDataPrefix() {
        return 'data-beacon';
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
     * Set beacons options
     * @param options
     * @return {this}
     */
    setOptions(options) {
        this.options = { ...this.constructor.getDefaultOptions(), ...options };
        return this;
    }

    setBeacons(beacons) {
        // cleanup for previous beacons
        this.removeAll();

        this.beacons = (!beacons
            || typeof beacons === 'string'
            || (Array.isArray(beacons) && beacons.every((v) => typeof v === 'string')))
            ? this.getDataBeacons(beacons)
            : this.getJsBeacons(beacons);

        if (this.beacons.length) {
            this.beacons.forEach((beacon) => {
                const { element } = beacon;

                if (!element) {
                    return;
                }

                const el = this.getEl(element);

                if (!el) {
                    return;
                }

                const beaconEl = this.createBeaconEl(beacon);
                beaconEl.hidden = true;

                if (this.constructor.isFixed(el)) {
                    beaconEl.classList.add(this.constructor.getFixedClass());
                }

                const parentEl = (!el.parentElement || el.parentElement === document.body)
                    ? document.body
                    : el.parentElement;

                parentEl.append(beaconEl);
                this.elements.set(beacon, beaconEl);
                this.setBeaconPosition(el, beaconEl, beacon);

                // fire observers
                this.observeResizing(el);
            });

            this.addOnWindowResizeListener();
        }

        return this;
    }

    getBeacons() {
        return this.beacons;
    }

    getBeacon(id, def) {
        const [beacon] = (id && typeof id === 'object') ? [id] : this.beacons.filter((v) => v.id === id);
        return beacon || def;
    }

    getDataBeacons(ids) {
        const beaconsIds = (typeof ids === 'string')
            ? ids.split(',').map((v) => v.trim())
            : ids;

        let beaconsSelector = [`[${this.constructor.getBeaconDataPrefix()}]`];

        if (beaconsIds) {
            beaconsSelector = [];

            beaconsIds.forEach((id) => {
                beaconsSelector.push(`[${this.constructor.getBeaconDataPrefix()}*='${id}']`);
            });
        }

        const beaconsEl = Array.from(document.querySelectorAll(beaconsSelector.join(',')));
        const dataGlobalRegExp = new RegExp(`^${this.constructor.getBeaconDataPrefix()}-([^-]+)$`);

        const beacons = [];

        beaconsEl.forEach((el) => {
            const { value: beaconsIdsAttrValue } = el.attributes[this.constructor.getBeaconDataPrefix()];

            if (!beaconsIdsAttrValue) {
                return;
            }

            const elBeaconsIds = beaconsIdsAttrValue.split(',');

            elBeaconsIds.forEach((id) => {
                if (beaconsIds && !beaconsIds.includes(id)) {
                    return;
                }

                const globalBeaconAttrs = {};
                const beaconAttrs = {};

                const dataBeaconRegExp = new RegExp(`^${this.constructor.getBeaconDataPrefix()}-${id}-([^-]+)$`);

                // parse attributes
                for (let j = 0; j < el.attributes.length; j++) {
                    const { name: attrName, value: attrValue } = el.attributes[j];

                    const isGlobalAttr = dataGlobalRegExp.test(attrName);
                    const isBeaconAttr = dataBeaconRegExp.test(attrName);

                    if (isGlobalAttr) {
                        const [, shortAttrName] = attrName.match(dataGlobalRegExp);

                        globalBeaconAttrs[shortAttrName] = attrValue;
                    } else if (isBeaconAttr) {
                        const [, shortAttrName] = attrName.match(dataBeaconRegExp);

                        beaconAttrs[shortAttrName] = attrValue;
                    }
                }

                const beacon = {
                    id,
                    position: this.options.position,
                    ...globalBeaconAttrs,
                    ...beaconAttrs,
                    element: el,
                };

                if (beacon.onclick || beacon.onClick) {
                    beacon.onClick = (e) => {
                        if (beacon.onclick) {
                            const shadow = document.createElement('div');
                            shadow.style.visibility = 'hidden';
                            shadow.setAttribute('onclick', beacon.onclick);
                            document.body.append(shadow);

                            shadow.click();
                            document.body.removeChild(shadow);
                        } else if (typeof beacon.onClick === 'function') {
                            beacon.onClick.call(e, beacon);
                        }
                    };
                }

                beacons.push(beacon);
            });
        });

        return beacons;
    }

    getJsBeacons(beacons) {
        // cast to array
        const array = (!Array.isArray(beacons))
            ? [beacons]
            : beacons;

        return array.map((v, i) => ({ ...v, id: v.id || i }));
    }

    createBeaconEl(beacon) {
        const data = { ...beacon };

        data.onClick = (e) => {
            e.stopPropagation();
            if (beacon.onClick) {
                beacon.onClick.call(this, e, beacon);
            }
        };

        return beaconTpl.call(this, { beacon: data });
    }

    getEl(selector) {
        return (selector instanceof HTMLElement)
            ? selector
            : document.querySelector(selector);
    }

    setBeaconPosition(el, beaconEl, options = {}) {
        let { position, boundary } = options;

        position = position || this.options.position;
        boundary = boundary || this.options.boundary;
        boundary = (boundary === 'inner') ? 'inner' : 'outer';

        const { offsetLeft: elLeft, offsetTop: elTop, offsetWidth: elWidth, offsetHeight: elHeight } = el;
        const { style: beaconStyle } = beaconEl;
        let { width: beaconWidth, height: beaconHeight } = getComputedStyle(beaconEl);

        beaconWidth = parseInt(beaconWidth, 10);
        beaconHeight = parseInt(beaconHeight, 10);

        beaconEl.removeAttribute('data-beacon-position');
        beaconEl.removeAttribute('data-beacon-boundary');

        beaconEl.setAttribute('data-beacon-position', position);
        beaconEl.setAttribute('data-beacon-boundary', boundary);

        switch (position) {
            case 'top-left': {
                if (boundary === 'inner') {
                    beaconStyle.left = `${elLeft}px`;
                    beaconStyle.top = `${elTop}px`;
                } else {
                    beaconStyle.left = `${elLeft - beaconWidth}px`;
                    beaconStyle.top = `${elTop - beaconHeight}px`;
                }

                break;
            }

            case 'top': {
                beaconStyle.left = `${elLeft + ((elWidth - beaconWidth) / 2)}px`;
                beaconStyle.top = (boundary === 'inner') ? `${elTop}px` : `${elTop - beaconHeight}px`;

                break;
            }

            case 'top-right': {
                if (boundary === 'inner') {
                    beaconStyle.left = `${elWidth + elLeft - beaconWidth}px`;
                    beaconStyle.top = `${elTop}px`;
                } else {
                    beaconStyle.left = `${elWidth + elLeft}px`;
                    beaconStyle.top = `${elTop - beaconHeight}px`;
                }

                break;
            }

            case 'left': {
                beaconStyle.left = (boundary === 'inner') ? `${elLeft}px` : `${elLeft - beaconWidth}px`;
                beaconStyle.top = `${elTop + ((elHeight - beaconHeight) / 2)}px`;

                break;
            }

            case 'right': {
                beaconStyle.left = (boundary === 'inner')
                    ? `${elLeft + elWidth - beaconWidth}px`
                    : `${elLeft + elWidth}px`;
                beaconStyle.top = `${elTop + ((elHeight - beaconHeight) / 2)}px`;

                break;
            }

            case 'bottom-left': {
                if (boundary === 'inner') {
                    beaconStyle.left = `${elLeft}px`;
                    beaconStyle.top = `${elTop + elHeight - beaconHeight}px`;
                } else {
                    beaconStyle.left = `${elLeft - beaconWidth}px`;
                    beaconStyle.top = `${elTop + elHeight}px`;
                }

                break;
            }

            case 'bottom': {
                beaconStyle.left = `${elLeft + ((elWidth - beaconWidth) / 2)}px`;
                beaconStyle.top = (boundary === 'inner')
                    ? `${elTop + elHeight - beaconHeight}px`
                    : `${elTop + elHeight}px`;

                break;
            }

            case 'bottom-right': {
                if (boundary === 'inner') {
                    beaconStyle.left = `${elWidth + elLeft - beaconWidth}px`;
                    beaconStyle.top = `${elTop + elHeight - beaconHeight}px`;
                } else {
                    beaconStyle.left = `${elWidth + elLeft}px`;
                    beaconStyle.top = `${elTop + elHeight}px`;
                }

                break;
            }

            case 'center':
            default: {
                beaconEl.setAttribute('data-beacon-position', 'center');
                beaconStyle.left = `${elLeft + ((elWidth - beaconWidth) / 2)}px`;
                beaconStyle.top = `${elTop + ((elHeight - beaconHeight) / 2)}px`;

                break;
            }
        }

        return this;
    }

    isCanShowBeacon({ canShow }) {
        if (canShow !== undefined) {
            if (!canShow || (typeof canShow === 'function' && canShow() === false)) {
                return false;
            }
        }

        return true;
    }

    showAll(force = false) {
        this.beacons.forEach((beacon) => {
            this.show(beacon, force);
        });

        return this;
    }

    show(id, force = false) {
        const beacon = this.getBeacon(id);

        if (beacon) {
            const beaconEl = this.elements.get(beacon);

            if (beaconEl) {
                if (force || this.isCanShowBeacon(beacon)) {
                    beaconEl.hidden = false;
                }
            }
        }

        return this;
    }

    hideAll() {
        this.beacons.forEach((beacon) => {
            this.hide(beacon);
        });

        return this;
    }

    hide(id) {
        const beacon = this.getBeacon(id);

        if (beacon) {
            const el = this.elements.get(beacon);

            if (el) {
                el.hidden = true;
            }
        }

        return this;
    }

    removeAll() {
        this.beacons.forEach((beacon) => {
            this.remove(beacon);
        });

        this.beacons = [];
        this.unobserveResizeAllElements();
        this.removeOnWindowResizeListener();

        return this;
    }

    remove(id) {
        const beacon = this.getBeacon(id);

        const beaconEl = this.elements.get(beacon);

        if (beaconEl) {
            beaconEl.parentNode.removeChild(beaconEl);
            const beaconIndex = this.beacons.indexOf(beacon);

            if (beaconIndex !== -1) {
                this.beacons.splice(this.beacons.indexOf(beacon), 1);
            }

            this.elements.delete(beacon);

            const el = this.getEl(beacon.element);

            if (el) {
                this.unobserveResizing(el);
            }
        }

        if (!this.beacons.length) {
            this.removeOnWindowResizeListener();
        }

        return this;
    }

    refresh() {
        this.beacons.forEach((beacon) => {
            const { element } = beacon;

            if (!element) {
                return;
            }

            const el = this.getEl(element);
            const beaconEl = this.elements.get(beacon);

            if (el && beaconEl) {
                this.setBeaconPosition(el, beaconEl, beacon);
            }
        });

        return this;
    }

    /**
     * Add window resize event listener
     * @return {this}
     */
    addOnWindowResizeListener() {
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
     * Observe resize step element
     * @return {this}
     */
    observeResizing(el, options = { box: 'border-box' }) {
        const { elementResizeObserver: observer } = this.observers;

        if (observer) {
            observer.observe(el, options);
        }

        return this;
    }

    /**
     * Unobserve resize step element
     * @param el
     * @return {this}
     */
    unobserveResizing(el) {
        const { elementResizeObserver: observer } = this.observers;

        if (observer) {
            observer.unobserve(el);
        }

        return this;
    }

    /**
     * Unobserve all resize steps elements
     * @return {this}
     */
    unobserveResizeAllElements() {
        const { elementResizeObserver: observer } = this.observers;

        if (observer) {
            observer.disconnect();
        }

        return this;
    }
}
