import render from '../utils/render';

/**
 * Description template
 * @param description
 * @returns {Element|null}
 */
export default ({ description }) => {
    if (description) {
        return render(`<div class="gc-description">${description}</div>`).element;
    }

    return null;
};
