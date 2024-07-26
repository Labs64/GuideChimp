import render from '../utils/render';

/**
 * Custom buttons template
 * @param buttons
 * @returns {Element|null}
 */
export default ({ buttons }) => {
    if (buttons && buttons.length) {
        const { refs: { buttonsEl }, element } = render('<div ref="buttonsEl" class="gc-custom-buttons" />');

        buttons.forEach((b) => {
            buttonsEl.append(b);
        });

        return element;
    }

    return null;
};
