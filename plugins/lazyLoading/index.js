/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the European Union Public License, version 1.2
 * located in the LICENSE file
 */

/**
 *
 * @param {Class} cls GuideChimp class
 * @param {Object} factory GuideChimp factory
 * @param {Object} options the options object
 */
module.exports = (cls, factory, options) => {
    const opt = options || {};

    let { timeout = 5000 } = opt;
    const { frequency = 100 } = opt;

    const parentInit = cls.prototype.init;

    // eslint-disable-next-line func-names,no-param-reassign
    cls.prototype.init = function () {
        parentInit.call(this);

        this.on('onBeforeChange', ({ element }) => new Promise((resolve) => {
            let el = document.querySelector(element);

            if (el) {
                resolve();
                return;
            }

            const interval = setInterval(() => {
                el = document.querySelector(element);

                timeout -= frequency;

                if (el || timeout <= 0) {
                    clearInterval(interval);
                    resolve();
                }
            }, frequency);
        }));
    };
};
