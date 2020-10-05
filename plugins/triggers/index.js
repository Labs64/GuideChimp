/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the Apache License 2.0 license
 * located in the LICENSE file and
 * NOTICE file corresponding to the section 4 d of the Apache License, Version 2.0
 */

module.exports = (cls) => {
    const parentInit = cls.prototype.init;

    const globalTriggersCacheKey = 'triggersListeners';
    const stepTriggersCacheKey = 'stepTriggersListeners';

    // eslint-disable-next-line func-names,no-param-reassign
    cls.prototype.init = function () {
        parentInit.call(this);

        // add triggers listeners
        this.on('onTrigger.next', () => this.next());
        this.on('onTrigger.previous', () => this.previous());
        this.on('onTrigger.stop', () => this.stop());

        const addTriggersListeners = (triggers) => {
            const listeners = [];

            Object.keys(triggers).forEach((k) => {
                let trigger = triggers[k];

                // cast to array
                trigger = Array.isArray(trigger) ? trigger : [trigger];

                trigger.forEach((v) => {
                    let el = v;
                    let event = 'click';
                    let customListener = null;

                    if (v !== null && Object.prototype.toString.call(v) === '[object Object]') {
                        el = v.element;
                        event = v.event || event;
                        customListener = v.listener || customListener;
                    }

                    const listener = (e) => {
                        const { target } = e;

                        let els = [];

                        if (typeof el === 'string') {
                            els = Array.from(document.querySelectorAll(el));
                        } else if (el instanceof NodeList) {
                            els = Array.from(el);
                        } else if (el instanceof HTMLElement) {
                            els = [el];
                        }

                        if (els.length) {
                            if (els.includes(target) || els.some((n) => n.contains(target))) {
                                if (customListener && typeof customListener === 'function') {
                                    customListener.call(this, e);
                                    return;
                                }

                                this.emit(`onTrigger.${k}`, e);
                            }
                        }
                    };

                    listeners.push([event, listener]);

                    document.body.addEventListener(event, listener, true);
                });
            });

            return listeners;
        };

        const removeTriggersListeners = (listeners) => {
            if (listeners) {
                listeners.forEach(([type, listener]) => {
                    document.body.removeEventListener(type, listener, true);
                });
            }

            return this;
        };

        // set up global triggers
        this.on('onStart', () => {
            const { triggers: globalTriggers } = this.getOptions();

            if (globalTriggers) {
                this.cache.set(globalTriggersCacheKey, addTriggersListeners(globalTriggers));
            }
        });

        // set up step triggers
        this.on('onBeforeChange', (to) => {
            // remove previous step triggers events listeners
            removeTriggersListeners(this.cache.get(stepTriggersCacheKey));
            this.cache.delete(stepTriggersCacheKey);

            const { triggers: stepTriggers } = to;

            if (stepTriggers) {
                this.cache.set(stepTriggersCacheKey, addTriggersListeners(stepTriggers));
            }

            return true;
        });

        this.on('onStop', () => {
            // remove triggers events listeners
            removeTriggersListeners(this.cache.get(globalTriggersCacheKey));
            removeTriggersListeners(this.cache.get(stepTriggersCacheKey));

            this.cache.delete(globalTriggersCacheKey);
            this.cache.delete(stepTriggersCacheKey);
        });
    };
};
