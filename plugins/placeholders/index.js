// eslint-disable no-param-reassign
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
module.exports = (cls) => {
    const parentInit = cls.prototype.init;

    // eslint-disable-next-line no-param-reassign
    cls.placeholders = {};

    // eslint-disable-next-line no-param-reassign
    cls.prototype.setPlaceholders = function (placeholders) {
        this.placeholders = placeholders;
        return this;
    };

    // eslint-disable-next-line no-param-reassign
    cls.prototype.addPlaceholder = function (key, value) {
        this.placeholders[key] = value;
        return this;
    };

    // eslint-disable-next-line no-param-reassign
    cls.prototype.addPlaceholders = function (placeholders) {
        this.placeholders = { ...this.placeholders, ...placeholders };
        return this;
    };

    // eslint-disable-next-line no-param-reassign
    cls.prototype.removePlaceholder = function (key) {
        delete this.placeholders[key];
        return this;
    };

    // eslint-disable-next-line no-param-reassign
    cls.prototype.removePlaceholders = function (keys = []) {
        if (!keys.length) {
            this.placeholders = {};
            return this;
        }

        keys.forEach((key) => {
            delete this.placeholders[key];
        });

        return this;
    };

    // eslint-disable-next-line func-names,no-param-reassign
    cls.prototype.init = function () {
        parentInit.call(this);

        const { placeholderTemplate = '{*}' } = this.options;

        this.on('onBeforeChange', async (toStep, ...args) => {
            let { placeholders } = toStep;

            if (typeof placeholders === 'function') {
                placeholders = await Promise.resolve()
                    .then(() => placeholders.call(this, toStep, ...args));
            }

            placeholders = { ...this.placeholders, ...placeholders };
            const placeholdersKeys = Object.keys(placeholders);

            if (placeholdersKeys.length) {
                const replacePlaceholders = (object) => {
                    placeholdersKeys.forEach((placeholderKey) => {
                        const placeholderSearch = placeholderTemplate.replace('*', placeholderKey);

                        Object.keys(object).forEach((key) => {
                            const value = toStep[key];

                            if (value != null && typeof value === 'object') {
                                replacePlaceholders(value);
                                return;
                            }

                            if (typeof value === 'string') {
                                // eslint-disable-next-line no-param-reassign
                                object[key] = value.replace(placeholderSearch, placeholders[placeholderKey]);
                            }
                        });
                    });
                };

                replacePlaceholders(toStep);
            }
        });
    };
};
