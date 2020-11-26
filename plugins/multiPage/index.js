/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the European Union Public License, version 1.2
 * located in the LICENSE file
 */

const sha256Tour = async (tour) => {
    // encode as UTF-8
    const msgBuffer = new TextEncoder('utf-8').encode(JSON.stringify(tour));

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    return hashArray.map((b) => (`00${b.toString(16)}`).slice(-2)).join('');
};

module.exports = (cls) => {
    const storageKey = 'GUIDECHIMP_MULTIPAGE';
    const parentInit = cls.prototype.init;

    // eslint-disable-next-line func-names,no-param-reassign
    cls.prototype.init = function () {
        parentInit.call(this);

        this.on('onBeforeChange', async (toStep, ...args) => {
            const { multiPage } = toStep;

            if (multiPage) {
                if (typeof this.tour !== 'string') {
                    const { page } = multiPage;

                    const href = (typeof page === 'function')
                        ? await Promise.resolve().then(() => page.call(this, toStep, ...args))
                        : page;

                    if (href) {
                        const url = document.createElement('a');
                        url.href = String(href);

                        if (url.href !== window.location.href) {
                            const storage = (sessionStorage.getItem(storageKey))
                                ? JSON.parse(sessionStorage.getItem(storageKey))
                                : {};

                            const tourHash = await sha256Tour(this.tour);
                            storage[tourHash] = this.steps.indexOf(toStep);

                            sessionStorage.setItem(storageKey, JSON.stringify(storage));
                            window.location.href = url.href;

                            // wait page loading
                            await new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                }, 300000); // wait 5 minutes
                            });
                            return false;
                        }
                    }
                }
            }

            return true;
        });
    };

    // eslint-disable-next-line no-param-reassign,func-names
    cls.prototype.continue = async function () {
        const tourHash = await sha256Tour(this.tour);
        const storage = (sessionStorage.getItem(storageKey))
            ? JSON.parse(sessionStorage.getItem(storageKey))
            : {};

        const stepIndex = storage[tourHash];

        if (stepIndex !== undefined && stepIndex !== null) {
            delete storage[tourHash];

            if (!Object.keys(storage).length) {
                sessionStorage.removeItem(storageKey);
            } else {
                sessionStorage.setItem(storageKey, JSON.stringify(storage));
            }

            return this.start(stepIndex, true);
        }

        return false;
    };
};
