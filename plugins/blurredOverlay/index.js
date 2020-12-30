/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the European Union Public License, version 1.2
 * located in the LICENSE file
 */

import './assets/style.scss';

module.exports = (cls) => {
    // eslint-disable-next-line no-param-reassign
    cls.getNotBlurredClass = () => 'gc-not-blurred';

    const parentInit = cls.prototype.init;

    // eslint-disable-next-line func-names,no-param-reassign
    cls.prototype.init = function () {
        parentInit.call(this);

        const removeNotBlurredClass = () => {
            const notBlurredClass = this.constructor.getNotBlurredClass();

            const els = document.querySelectorAll(`.${notBlurredClass}`);

            els.forEach((el) => {
                el.classList.remove(notBlurredClass);
            });
        };

        this.on('onAfterChange', (toStep) => {
            removeNotBlurredClass();

            let el = this.getStepElement(toStep);

            while (el) {
                if (el === el.ownerDocument.body) {
                    break;
                }

                el.classList.add(this.constructor.getNotBlurredClass());

                el = el.parentElement;
            }
        });

        this.on('onStop', () => {
            removeNotBlurredClass();
        });
    };
};
