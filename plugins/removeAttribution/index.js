/**
 * Copyright (C) 2020 Labs64 GmbH
 *
 * This source code is licensed under the Apache License 2.0 license
 * located in the LICENSE file and
 * NOTICE file corresponding to the section 4 d of the Apache License, Version 2.0
 */

module.exports = (cls) => {
    // eslint-disable-next-line no-param-reassign
    cls.prototype.showCopyright = () => document.createElement('div');
};
