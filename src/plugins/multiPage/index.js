/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the Apache License 2.0 license
 * located in the LICENSE file and
 * NOTICE file corresponding to the section 4 d of the Apache License, Version 2.0
 */

/* eslint-disable no-param-reassign,func-names */
module.exports = (c) => {
    const storageKey = 'GUIDECHIMP_MULTIPAGE_STEP';
    const parentInit = c.prototype.init;

    c.prototype.init = function () {
        parentInit();

        this.on('onBeforeChange', (toStep) => {
            if (this.tour && this.tour !== 'string') {
                if (toStep.page) {
                    const url = document.createElement('a');
                    url.href = toStep.page;

                    if (url.href !== window.location.href) {
                        sessionStorage.setItem(storageKey, this.steps.indexOf(toStep));
                        window.location.href = toStep.page;
                        return false;
                    }
                }
            }

            return true;
        });
    };

    c.prototype.continue = async function () {
        const stepIndex = sessionStorage.getItem(storageKey);

        if (stepIndex !== null) {
            sessionStorage.removeItem(storageKey);
            return this.start(stepIndex, true);
        }

        return false;
    };
};
