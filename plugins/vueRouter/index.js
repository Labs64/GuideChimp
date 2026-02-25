/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the European Union Public License, version 1.2
 * located in the LICENSE file
 */

module.exports = (cls, factory, router, debug = false) => {
    const parentInit = cls.prototype.init;

    // eslint-disable-next-line func-names,no-param-reassign
    cls.prototype.init = function () {
        parentInit.call(this);

        this.on('onBeforeChange', async (to) => {
            const { route } = to;

            // wait for page change
            if (route) {
                try {
                    await router.push(route);
                } catch (e) {
                    if (debug) {
                        // eslint-disable-next-line no-console
                        console.error(e);
                    }
                }
            }
        });
    };
};
