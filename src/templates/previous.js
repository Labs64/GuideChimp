import render from '../utils/render';

/**
 * Previous arrow template
 * @param showNavigation
 * @param previousStep
 * @param previous
 * @returns {Element|*}
 */
export default ({ showNavigation, previousStep, previous }) => {
    const classes = (!previousStep || !showNavigation) ? 'gc-hidden' : '';

    const { refs: { prevEl }, element } = render(`<div ref="prevEl" class="gc-navigation-prev ${classes}"/>`);

    prevEl.addEventListener('click', (e) => {
        previous(e);
    });

    return element;
};
