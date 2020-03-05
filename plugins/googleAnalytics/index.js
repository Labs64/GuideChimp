/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the Apache License 2.0 license
 * located in the LICENSE file and
 * NOTICE file corresponding to the section 4 d of the Apache License, Version 2.0
 */
const events = new Map();

module.exports = (cls, factory) => {
    const gaEvent = async (action, parameters = {}) => {
        if (typeof gtag !== 'function') {
            // eslint-disable-next-line no-console
            console.warn('GuideChimp [Google Analytics Plugin]: Function gtag is undefined');
            return false;
        }

        return new Promise((s) => {
            // eslint-disable-next-line no-undef
            gtag('event', action, { ...parameters, event_callback: () => s(true) });
        });
    };

    // eslint-disable-next-line func-names
    const gaOnListener = (event, action, parameters = {}) => function (...args) {
        const params = (typeof parameters === 'function')
            ? parameters.apply(this, args)
            : parameters;

        params.event_category = params.event_category || event;

        gaEvent(action, params);
    };

    const gaTimingListeners = (startEvent, endEvent, parameters = {}) => {
        let time = null;
        let startEventContext = [];
        let endEventContext = [];

        const startEventListener = (...args) => {
            time = (new Date()).getTime();
            startEventContext = [...args];
        };

        // eslint-disable-next-line func-names
        const endEventListener = function (...args) {
            if (time) {
                endEventContext = [...args];
                const params = (typeof parameters === 'function')
                    ? parameters.apply(this, [...startEventContext, ...endEventContext])
                    : parameters;

                params.name = params.name || 'load';
                params.value = (new Date()).getTime() - time;

                gaEvent('timing_complete', params);
            }
        };

        return { startEventListener, endEventListener };
    };

    // eslint-disable-next-line no-param-reassign,func-names
    factory.gaOn = function (event, action, parameters = {}) {
        const listeners = events.get(event) || [];

        // eslint-disable-next-line func-names
        listeners.push(gaOnListener(event, action, parameters));

        events.set(event, listeners);
        return this;
    };

    // eslint-disable-next-line no-param-reassign,func-names
    factory.gaTiming = function (startEvent, endEvent, parameters = {}) {
        const { startEventListener, endEventListener } = gaTimingListeners(startEvent, endEvent, parameters);

        const startEventListeners = events.get(startEvent) || [];
        const endEventListeners = events.get(endEvent) || [];

        startEventListeners.push(startEventListener);

        // eslint-disable-next-line consistent-return,func-names
        endEventListeners.push(endEventListener);

        events.set(startEvent, startEventListeners);
        events.set(endEvent, endEventListeners);

        return this;
    };

    const parentInit = cls.prototype.init;

    // eslint-disable-next-line no-param-reassign,func-names
    cls.prototype.init = function () {
        parentInit();

        // set global gtag events
        Array.from(events).forEach(([event, listeners]) => {
            listeners.forEach((listener) => {
                this.on(event, listener);
            });
        });
    };

    // eslint-disable-next-line func-names,no-param-reassign
    cls.prototype.gaOn = function (event, action, parameters = {}) {
        // eslint-disable-next-line func-names
        this.on(event, gaOnListener(event, action, parameters));
        return this;
    };

    // eslint-disable-next-line func-names,no-param-reassign
    cls.prototype.gaTiming = function (startEvent, endEvent, parameters = {}) {
        const { startEventListener, endEventListener } = gaTimingListeners(startEvent, endEvent, parameters);

        // eslint-disable-next-line func-names
        this.on(startEvent, startEventListener);

        // eslint-disable-next-line func-names
        this.on(endEvent, endEventListener);

        return this;
    };

    // eslint-disable-next-line no-param-reassign
    cls.prototype.gaEvent = async (action, parameters = {}) => gaEvent(action, parameters);
};
