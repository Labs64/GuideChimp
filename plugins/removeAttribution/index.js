/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the European Union Public License, version 1.2
 * located in the LICENSE file
 */

module.exports = (cls) => {
    // eslint-disable-next-line no-param-reassign
    cls.prototype.showCopyright = () => document.createElement('div');
};
