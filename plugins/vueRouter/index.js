/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the Apache License 2.0 license
 * located in the LICENSE file and
 * NOTICE file corresponding to the section 4 d of the Apache License, Version 2.0
 */

module.exports = (cls, factory, router) => {
    const parentInit = cls.prototype.init;

    // eslint-disable-next-line func-names,no-param-reassign
    cls.prototype.init = function () {
        parentInit.call(this);

        this.on('onBeforeChange', async (to) => {
            const { route } = to;

            // wait for page change
            if (route) {
                await router.push(route);
            }
        });
    };
};
