import render from '../utils/render';

/**
 * Control template
 * @param tooltip {Element}
 * @returns {Element|*}
 */
export default ({ tooltip }) => {
    const { element: control } = render('<div class="gc-control" />');
    control.append(tooltip);

    return control;
};
