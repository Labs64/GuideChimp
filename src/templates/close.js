import render from '../utils/render';

/**
 * Close button template
 * @param stop
 * @returns {null|Element}
 */
export default ({ stop }) => {
    const { element } = render('<div class="gc-close" />');

    element.addEventListener('click', (e) => {
        stop(e);
    });

    return element;
};
