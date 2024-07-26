import render from '../utils/render';

/**
 * Next arrow template
 * @param nextStep
 * @param showNavigation
 * @param next
 * @returns {null|Element}
 */
export default ({ nextStep, showNavigation, next }) => {
    const classes = (!nextStep || !showNavigation) ? 'gc-hidden' : '';

    const { element } = render(`<div class="gc-navigation-next ${classes}" />`);

    element.addEventListener('click', (e) => {
        next(e);
    });

    return element;
};
