import render from '../utils/render';

/**
 * Fate step template
 * @returns {Element|*}
 */
export default () => {
    const { element } = render('<div class="gc-fake-step"></div>');
    return element;
};
