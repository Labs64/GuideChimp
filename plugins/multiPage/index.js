/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the Apache License 2.0 license
 * located in the LICENSE file and
 * NOTICE file corresponding to the section 4 d of the Apache License, Version 2.0
 */

module.exports = (cls) => {
    const storageKey = 'GUIDECHIMP_MULTIPAGE_STEP';
    const parentInit = cls.prototype.init;

    // eslint-disable-next-line func-names,no-param-reassign
    cls.prototype.init = function () {
        parentInit();

        this.on('onBeforeChange', (to) => {
            const { multiPage } = to;

            if (multiPage) {
                if (typeof this.tour !== 'string') {
                    const { page } = multiPage;

                    if (page) {
                        const url = document.createElement('a');
                        url.href = page;

                        if (url.href !== window.location.href) {
                            sessionStorage.setItem(storageKey, this.steps.indexOf(to));
                            window.location.href = page;
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
        const stepIndex = sessionStorage.getItem(storageKey);

        if (stepIndex !== null) {
            sessionStorage.removeItem(storageKey);
            return this.start(stepIndex, true);
        }

        return false;
    };
};
