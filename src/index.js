/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the European Union Public License, version 1.2
 * located in the LICENSE file
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
