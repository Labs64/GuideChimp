import render from '../utils/render';

/**
 *
 * @param title
 * @returns {Element|null}
 */
export default ({ title }) => {
    if (title) {
        return render(`<div class="gc-title">${title}</div>`).element;
    }

    return null;
};
