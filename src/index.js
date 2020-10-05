/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the Apache License 2.0 license
 * located in the LICENSE file and
 * NOTICE file corresponding to the section 4 d of the Apache License, Version 2.0
 */

import GuideChimp from './GuideChimp';

/* ============
 * Styling
 * ============
 *
 * Import the library styling.
 */
import './assets/style.scss';

const guideChimp = (...args) => new GuideChimp(...args);

guideChimp.prototype = GuideChimp.prototype;
guideChimp.plugins = new Set();

guideChimp.extend = (plugin, ...args) => {
    if (!guideChimp.plugins.has(plugin)) {
        guideChimp.plugins.add(plugin);
        plugin(GuideChimp, guideChimp, ...args);
    }
    return guideChimp;
};

module.exports = guideChimp;
