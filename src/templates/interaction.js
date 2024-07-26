import render from '../utils/render';

/**
 * Disable interaction template
 * @param interaction {boolean}
 * @returns {Element|null}
 */
export default ({ interaction }) => {
    if (!interaction) {
        return render('<div class="gc-interaction gc-disable"/>').element;
    }

    return null;
};
